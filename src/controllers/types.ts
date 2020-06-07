/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Request} from 'express';

export interface RequestWithUser extends Request {
  user?: {
    user_id: string;
    exp: number;
  };
}
