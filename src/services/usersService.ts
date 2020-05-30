import {tokenData, TokenPair, UsersServiceI} from '../core/users';
import {injectable} from 'inversify';
import NodeCache from 'node-cache';

import config from '../config/config';
import crypto from 'crypto';
// @ts-ignore
import jwt from 'jsonwebtoken';




@injectable()
export class UsersService implements UsersServiceI {
  private _cache: NodeCache;
  // @ts-ignore
  private _tsClient: any;
  private _jwtSecret: string;

  public constructor() {
    this._cache = new NodeCache({deleteOnExpire: true, stdTTL: 120});


    console.log("CFGGG", config);


    const accountSid = 'ACc730049cf01d3a24ffa7e37abc2af68f';
    const authToken = '245cdaa547693aa3b24e6927f6b14552';
    this._tsClient = require('twilio')(accountSid, authToken);
    console.log(this._tsClient);

    // const phoneNumber = '79219451207';
    // const message = `Your code is 12345`;
    // const messageType = 'ARN';

    this._jwtSecret = config.jwt_secret;
  }

  login(phone: string, code: string): TokenPair {
    const savedCode = this._cache.get(phone);
    console.log(this._cache.get(phone), code)
    if (savedCode === undefined || code !== savedCode) throw 'Wrong code';
    const user_id = this.getHash(phone);
    const exp = Date.now() / 1000 + 60 * 30;
    const tData: tokenData = {user_id, exp};
    const token = jwt.sign(tData, this._jwtSecret);
    return {
      access: token,
      refresh: token,
    };
  }

  sendCode(phone: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const length = 6;
      const possible = '0123456789';
      let code = '';
      for (let i = 0; i < length; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      const phoneNumber = '+79219451207';
      const message = `Your code is ${code}`;
      const result = await this._tsClient.messages
          .create({
            body: message,
            from: '+1 937 358 6960',
            to: phoneNumber,
          })
      console.log(result);
      this._cache.set(phone, code);
      resolve(true);

    });
  }

  private getHash(phone: string): string {
    return crypto
      .createHash('md5')
      .update(phone + config.jwt_secret)
      .digest('hex');
  }
}



