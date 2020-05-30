/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {BLUZELLE_CHAINID, BLUZELLE_ENDPOINT} from '../../config';
import {bluzelle, API} from 'bluzelle';
import {GasInfo} from 'bluzelle/src/GasInfo';

export class Bluzelle {
  private instance: API | undefined = undefined;
  private readonly uuid: string;
  private static _address: string;
  private static _mnemonic: string;
  private static gasPrice: GasInfo = {
    gas_price: 10,
  };

  constructor(uuid?: string) {
    this.uuid = uuid || Bluzelle._address;
  }

  static get address(): string {
    return this._address;
  }

  static set mnemonic(value: string) {
    this._mnemonic = value;
  }

  public check(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        console.log(await this.getKeys());
        resolve(true);
        return;
      } catch (e) {
        reject(e);
      }
      reject('Cant get bluzjs');
    });
  }

  public add(key: string, value: Object): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const api = await this.getBluzelle();
      api
        .create(key, JSON.stringify(value), {gas_price: 10})
        .then(() => resolve(true))
        .catch((reason) => reject(reason));
      // console.log(await bluzelle.read("somekey"))
    });
  }

  public read(key: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const api = await this.getBluzelle();
        resolve(await api.read(key));
      } catch (e) {
        reject(e);
      }
    });
  }

  public create(key: string, value: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.checkWritePermission();
        const api = await this.getBluzelle();

        if (api.has(key)) {
          throw 'key already exists';
        } else {
          await api.create(key, value, Bluzelle.gasPrice);
        }

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public update(key: string, value: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.checkWritePermission();
        const api = await this.getBluzelle();
        if (api.has(key)) {
          await api.update(key, value, Bluzelle.gasPrice);
        } else {
          throw 'key doesn\'t exists';
        }

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public createUpdate(key: string, value: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.checkWritePermission();
        const api = await this.getBluzelle();
        if (api.has(key)) {
          await api.update(key, value, Bluzelle.gasPrice);
        } else {
          await api.create(key, value, Bluzelle.gasPrice);
        }

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public getKeys(): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {
      try {
        const bluzelle = await this.getBluzelle();
        resolve(await bluzelle.keys());
      } catch (e) {
        reject(e.toString());
      }
    });
  }

  private checkWritePermission() {
    if (Bluzelle._address !== this.uuid) throw 'You have no rights to write to ' + this.uuid;
  }

  private getBluzelle(): Promise<API> {
    return new Promise<API>(async (resolve, reject) => {
      try {
        if (Bluzelle._mnemonic === undefined) {
          reject('Mnemonic is undefined');
        }
        if (this.instance === undefined) {
          const api = await bluzelle({
            mnemonic: Bluzelle._mnemonic,
            uuid: this.uuid,
            endpoint: BLUZELLE_ENDPOINT,
            chain_id: BLUZELLE_CHAINID,
          });

          const account = await api.account();
          if (account.address === '') {
            reject('Wrong mnemonic');
          }
          console.log(this.uuid, account);
          this.instance = api;
          Bluzelle._address = account.address;
        }

        resolve(this.instance);
      } catch (e) {
        reject(e);
      }
    });
  }
}
