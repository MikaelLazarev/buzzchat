import SocketIO, {Socket} from 'socket.io';
import {TokenPair} from '../core/users';
import {injectable} from 'inversify';
import {v4 as uuidv4} from 'uuid';

@injectable()
export class UserWebAuthController {
  private readonly socketsPool: Record<string, Socket> = {};

  constructor() {
    console.log("HELKLLLO")
  }

  connect(io: SocketIO.Server) {
    console.log("CNTK")
    const nsp = io.of('/webwait');
    nsp.on('connection', (socket) => {
      socket.use((packet, next) => {
        console.log(`[SOCKET-WEBAUTH.IO] : INCOMING REQUEST ${packet[0]}`);
        next();
      });

      const code = uuidv4();
      this.socketsPool[code] = socket;
      console.log(`Web waiting connected with ${code}`);
      socket.on('getCode', () => {
        socket.emit('code', code);
      })

      socket.on('error', (error) => {
        console.log(error)
      })

      socket.on('disconnect', (reason: string) => {
        //this socket is authenticated, we are good to handle more events from it.
        console.log(`bye ${code} because ${reason}`);
        delete this.socketsPool[code];
      });
    });
  }

  sendAuth(code: string, pair: TokenPair): void {
    if (this.socketsPool[code] === undefined) {
      console.log('Code not found');
    }

    const socket = this.socketsPool[code];
    socket.emit('login', pair);
  }
}
