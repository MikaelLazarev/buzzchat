import {
  ProfilesServiceI, profileUpdateDTOSchema, ProfileUpdateDTO
} from "../core/profiles";
import {  Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import Ajv, { ValidateFunction } from "ajv";
import {RequestWithUser} from "./types";

@injectable()
export class ProfilesController {
  private _service: ProfilesServiceI;
  private readonly _updateDTOValidate: ValidateFunction;

  constructor(@inject(TYPES.ProfilesService) service: ProfilesServiceI) {
    this._service = service;
    this._updateDTOValidate = new Ajv().compile(profileUpdateDTOSchema);
  }


  retrieve() {
    return async (req: RequestWithUser, res: Response) => {
      const id = req.user?.user_id;
      console.log("RETRIEVE", id)
      if (id === undefined) {
        return res.status(400).send("No id");
      }

      try {
        const result = await this._service.getProfile(id);
        res.status(200).json(result);
      } catch (e) {
        console.log(e);
        res.status(400).send();
      }
    };
  }

  update() {
    return async (req: RequestWithUser, res: Response) => {

      const user_id = req.user?.user_id;
      if (user_id === undefined) {
        return res.status(400).send("No user_id");
      }
      console.log("UPDATING", user_id)
      const dto: ProfileUpdateDTO = {
        name: req.body.name,
        avatar: req.body.avatar,
      };

      if (!this._updateDTOValidate(dto)) {
        console.log("Incorrect request", dto);
        return res.status(400).send("Incorrect request");
      }

      console.log(dto);

      try {
        const result = await this._service.update(user_id, dto);
        console.log(result);
        res.status(200).json(result);
      } catch (e) {
        console.log(e);
        res.status(400).send(e);
      }
    };
  }


}
