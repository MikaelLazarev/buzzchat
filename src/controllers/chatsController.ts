import {
  SocketController,
  socketListeners,
  SocketWithToken,
} from './socketRouter';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {Chat, ChatsServiceI, PostMessageDTO} from '../core/chat';

@injectable()
export class ChatsController implements SocketController {
  private _service: ChatsServiceI;
  private _namespace = 'chats';

  constructor(@inject(TYPES.ChatsService) issuersService: ChatsServiceI) {
    this._service = issuersService;
  }

  get namespace(): string {
    return this._namespace;
  }

  getListeners(socket: SocketWithToken, userId: string): socketListeners {
    return {
      list: async () => {
        const list = await this.list();
        socket.emit(this._namespace + ':updateList', list);
      },

      retrieve: async ({id}) => {
        const data = await this.retrieveItem(userId, id);
        socket.emit(this._namespace + ':updateDetails', data);
      },

      postMessage: async (dto: PostMessageDTO, opHash: string) => {
        console.log(dto);
        try {
          const result = await this._service.postMessage(userId, dto);

          socket.emit(this._namespace + ':updateDetails', result);
          socket.ok(opHash);
        } catch (e) {
          socket.failure(opHash, e);
        }
      },
    };
  }

  list(): Promise<Chat[] | undefined> {
    return this._service.list();
  }

  retrieveItem(userID: string, id: string): Promise<Chat | undefined> {
    return this._service.findById(userID, id);
  }

  update(): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }
}
