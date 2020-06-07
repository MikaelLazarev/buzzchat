/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {
  ProfilesServiceI,
  ProfileUpdateDTO,
  ProfileContactDTO,
} from '../core/profiles';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {
  SocketController,
  socketListeners,
  SocketWithToken,
} from './socketRouter';
import {SocketUpdate} from '../core/operations';

@injectable()
export class ProfilesController implements SocketController {
  private _service: ProfilesServiceI;
  private _namespace = 'profile';

  constructor(@inject(TYPES.ProfilesService) service: ProfilesServiceI) {
    console.log('Profiles controller started');
    this._service = service;
  }

  get namespace(): string {
    return this._namespace;
  }

  getListeners(socket: SocketWithToken, userId: string): socketListeners {
    return {
      list: async (data: string, opHash: string) => {
        try {
          const result = await this._service.list();
          socket.emit(this._namespace + ':updateList', result);

          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },

      retrieve: async (data: string, opHash: string) => {
        try {
          const result = await this._service.getProfile(userId);
          console.log(result);
          socket.emit(this._namespace + ':updateDetails', result);
          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },

      update: async (dto: ProfileUpdateDTO, opHash: string) => {
        console.log(dto);
        try {
          const result = await this._service.update(userId, dto);
          socket.emit(this._namespace + ':updateDetails', result);
          socket.ok(opHash);
        } catch (e) {
          console.log(e);
          socket.failure(opHash, e);
        }
      },

      new_contact: async (dto: ProfileContactDTO, opHash: string) => {
        console.log(dto);
        try {
          const result = await this._service.addContact(userId, dto.id);
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
