import {
  SocketController,
  socketListeners,
  SocketWithToken,
} from './socketRouter';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import { ChatCreateDTO, ChatsServiceI, PostMessageDTO} from '../core/chat';
import {SocketUpdate} from '../core/operations';

@injectable()
export class ChatsController implements SocketController {
  private _service: ChatsServiceI;
  private _namespace = 'chat';

  constructor(@inject(TYPES.ChatsService) issuersService: ChatsServiceI) {
    this._service = issuersService;
  }

  get namespace(): string {
    return this._namespace;
  }

  getListeners(socket: SocketWithToken, userId: string): socketListeners {
    return {
      create: async (dto: ChatCreateDTO, opHash: string) => {
        try {
          const chat = await this._service.create(userId, dto);
          socket.emit(this._namespace + ':updateDetails', chat);
          socket.ok(opHash);
        } catch (e) {
          socket.failure(opHash, e);
        }
      },

      retrieve: async (id: string, opHash: string) => {
        try {
          const data = await this._service.findById(userId, id);
          console.log("GOTT", data)
          socket.emit(this._namespace + ':updateDetails', data);
          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },

      postMessage: async (dto: PostMessageDTO, opHash: string) => {
        console.log(dto);
        try {
          const result = await this._service.postMessage(userId, dto);
          console.log(result)

          socket.emit(this._namespace + ':updateDetails', result);
          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },
    };
  }

  update(): SocketUpdate[] {
    return this._service.getUpdateQueue();
  }
}
