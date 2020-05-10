/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {BLUZELLE_CHAINID, BLUZELLE_ENDPOINT} from '../../config';
import {bluzelle, API} from 'bluzelle';

export class Bluzelle {
  private instance: API | undefined = undefined;
  private readonly uuid: string;
  private static _address: string;
  private static _mnemonic: string;

  constructor(uuid: string) {
    this.uuid = uuid;
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
        this.getKeys();
        resolve(true);
      } catch (e) {
        reject(e.toString());
      }
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

  public getKeys(): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {
      const bluzelle = await this.getBluzelle();
      try {
        resolve(await bluzelle.keys());
      } catch (e) {
        reject(e.toString());
      }
    });
  }

  private getBluzelle(): Promise<API> {
    return new Promise<API>(async (resolve, reject) => {
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
        this.instance = api;
        Bluzelle._address = (await api.account()).address;
      }

      resolve(this.instance);
    });
  }
}
