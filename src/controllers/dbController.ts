/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { Request, Response } from "express";
import { Db } from "../core/db";

export class DbController {
  retrieve() {
    return (req: Request, res: Response) => {
      res.status(200).json(Db.getStat());
    };
  }
}
