import SocketIO, {Socket} from 'socket.io';
import socketioJwt from 'socketio-jwt';
import config from '../config/config';
import {tokenData} from '../core/users';
import {SocketUpdate, STATUS} from '../core/operations';

export type socketListeners = Record<string, (...args: any[]) => Promise<void>>;

export interface SocketController {
  namespace: string;
  getListeners: (socket: SocketWithToken, userId: string) => socketListeners;
  update: () => SocketUpdate[];
}

export interface SocketWithToken extends SocketIO.Socket {
  tData: tokenData;
  ok: (opHash: string) => void;
  failure: (opHash: string, error: string) => void;
}

export class SocketRouter {
  private readonly socketsPool: Record<string, Socket> = {};
  private readonly _controllers: SocketController[];

  constructor(controllers: SocketController[]) {
    this._controllers = [...controllers];
    setTimeout(() => this.update(), 5000);
  }

  connect(io: SocketIO.Server) {
    const nsp = io.of('/data');
    nsp
      .on(
        'connection',
        socketioJwt.authorize({
          secret: config.jwt_secret,
          timeout: 15000, // 15 seconds to send the authentication message
          decodedPropertyName: 'tData',
        }),
      )
      .on('authenticated', this._onNewAuthSocket.bind(this));
  }

  // Connect new socket to pool
  private _onNewAuthSocket(socket: SocketWithToken) {
    console.log('HELLLO!');
    console.log(this);

    const userId = socket.tData.user_id;

    // Add new socket in socketsPool connection array
    this.socketsPool[userId] = socket;
    console.log(`[SOCKET.IO] : user ${userId} connected`);

    // Middleware to show all incoming requests
    socket.use((packet, next) => {
      console.log(`[SOCKET.IO] : INCOMING REQUEST ${packet[0]}`);
      next();
    });

    // Add delete listener
    socket.on('disconnect', () => {
      //this socket is authenticated, we are good to handle more events from it.
      console.log(`bye ${userId}`);
      delete this.socketsPool[userId];
    });

    socket.ok = (opHash: string) => {
      socket.emit('operations:update', {
        id: opHash,
        status: STATUS.SUCCESS,
      });
    };

    socket.failure = (opHash, error) => {
      socket.emit('operations:update', {
        id: opHash,
        status: STATUS.FAILURE,
        error,
      });
    };

    // Add listeners from all controllers
    for (const controller of this._controllers) {
      const listeners = controller.getListeners(socket, userId);

      const {namespace} = controller;
      Object.entries(listeners).map((l) => {
        const event = l[0];
        const handler = l[1];
        socket.on(
          namespace + ':' + event,
          this.loggerMiddleware(namespace, event, handler),
        );
      });
      console.log(`[SOCKET.IO] : ${namespace} | listeners connected`);
    }
  }

  private loggerMiddleware(
    namespace: string,
    event: string,
    fn: (...args: any[]) => Promise<void>,
  ): any {
    return async function (...args: any[]) {
      const start = Date.now();
      await fn(...args);
      const finish = Date.now();
      console.log(
        `[SOCKET.IO] : ${namespace} | ${event} | ${finish - start} ms`,
      );
    };
  }

  private update(): void {
    for (const controller of this._controllers) {
      const updates = controller.update();
      updates
        .filter((elm) => this.socketsPool[elm.userId] !== undefined)
        .forEach((elm) => {
          const socket = this.socketsPool[elm.userId];
          socket.emit(elm.event, elm.payload);
        });
    }

    setTimeout(() => this.update(), 500);
  }
}
