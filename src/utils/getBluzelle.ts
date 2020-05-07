/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {BLUZELLE_CHAINID, BLUZELLE_ENDPOINT} from '../../config';
import {bluzelle} from '../blzjs/src/main.js';
import {bluzelleInstance} from './types';

export class Bluzelle {
  private instance: Promise<bluzelleInstance> | undefined = undefined;
  private readonly uuid: string;
  private static _address: string;
  private static _mnemonic: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }

  static set address(value: string) {
    this._address = value;
  }

  static set mnemonic(value: string) {
    this._mnemonic = value;
  }

  public add(key: string, value: Object): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const bluzelle = await this.getBluzelle();
      bluzelle
        .create(key, value)
        .then(() => resolve(true))
        .catch((reason) => reject(reason));
    });
  }

  private getBluzelle(): Promise<bluzelleInstance> {
    return new Promise<bluzelleInstance>((resolve, reject) => {
      if (Bluzelle._address === undefined || Bluzelle._mnemonic === undefined) {
        reject('Address or mnemonic is undefined');
      }
      if (this.instance === undefined) {
        this.instance = bluzelle({
          log: '',
          address: Bluzelle._address,
          mnemonic: Bluzelle._mnemonic,
          uuid: this.uuid,
          endpoint: BLUZELLE_ENDPOINT,
          chain_id: BLUZELLE_CHAINID,
        }) as Promise<bluzelleInstance>;
      }

      resolve(this.instance);
    });
  }
}
