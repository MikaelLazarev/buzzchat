/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

export interface tokenData {
  user_id: string;
  exp: number;
}

export interface TokenPair {
  access: string;
  refresh: string;
}

export interface UserSendCodeDTO {
  phone: string;
}

export const sendCodeDTOSchema = {
  type: 'object',
  required: ['phone'],
  properties: {
    phone: {
      type: 'string',
    },
  },
};

export interface LoginDTO {
  phone: string;
  code: string;
}

export const loginDTOSchema = {
  type: 'object',
  required: ['phone', 'code'],
  properties: {
    phone: {
      type: 'string',
    },
    code: {
      type: 'string',
    },
  },
};

export interface UsersServiceI {
  sendCode(phone: string): Promise<boolean>;
  login(phone: string, code: string): TokenPair;
}