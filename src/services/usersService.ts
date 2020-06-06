import {tokenData, TokenPair, UsersServiceI} from '../core/users';
import {inject, injectable} from 'inversify';
import NodeCache from 'node-cache';

import config from '../config/config';
import crypto from 'crypto';
// @ts-ignore
import jwt from 'jsonwebtoken';
import {TYPES} from "../types";
import {UserWebAuthController} from "../controllers/userWebAuthController";

@injectable()
export class UsersService implements UsersServiceI {
  private _cache: NodeCache;
  private _webAuthController: UserWebAuthController;
  // @ts-ignore
  private _tsClient: any;
  private _jwtSecret: string;

  public constructor(
      @inject(TYPES.UserWebAuthController) webAuthController: UserWebAuthController,
  ) {
    this._cache = new NodeCache({deleteOnExpire: true, stdTTL: 120});
    this._webAuthController = webAuthController;

    console.log('CFGGG', config);

    this._tsClient = require('twilio')(config.twillio_sid, config.twillio_key);
    console.log(this._tsClient);

    this._jwtSecret = config.jwt_secret;
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
      const result = await this._tsClient.messages.create({
        body: message,
        from: '+1 937 358 6960',
        to: phoneNumber,
      });
      console.log(result);
      this._cache.set(phone, code);
      resolve(true);
    });
  }

  login(phone: string, code: string): TokenPair {
    const savedCode = this._cache.get(phone);
    console.log(this._cache.get(phone), code);
    if (savedCode === undefined || code !== savedCode) throw 'Wrong code';
    const user_id = this.getHash(phone);
    return this.generateTokenPair(user_id);
  }


  refresh(refreshToken: string) : TokenPair {
    try {
      const data: tokenData = jwt.verify(refreshToken, config.jwt_secret) as tokenData;
      if (Date.now() > data.exp * 1000) throw "Expired token";
      return this.generateTokenPair(data.user_id);
    } catch (e) {
      console.log(e);
      throw "Token error"
    }

  }

  authorizeWeb(userId: string, code: string) {
    this._webAuthController.sendAuth(code, this.generateTokenPair(userId));
  }

  private getHash(phone: string): string {
    return crypto
      .createHash('md5')
      .update(phone + config.jwt_secret)
      .digest('hex');
  }

  private generateTokenPair(user_id: string): TokenPair {
    const HOUR = 3600; // Hour in seconds

    const accessExp = Date.now() / 1000 + HOUR / 2;
    const accessData: tokenData = {user_id, exp: accessExp};
    const access = jwt.sign(accessData, this._jwtSecret);

    const refreshExp = Date.now() / 1000 + 30 * HOUR;
    const refreshData: tokenData = {user_id, exp: refreshExp};
    const refresh = jwt.sign(refreshData, this._jwtSecret);
    return {
      access,
      refresh,
    };
  }
}
