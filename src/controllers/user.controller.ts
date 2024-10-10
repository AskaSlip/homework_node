import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IUserListQuery;
      const result = await userService.getList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await userService.getById(userId);
      const result = userPresenter.toPublicResDto(user);

      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const user = await userService.getMe(jwtPayload);
      const result = userPresenter.toPublicResDto(user);

      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const dto = req.body as IUser;
      const user = await userService.updateMe(jwtPayload, dto);
      const result = userPresenter.toPublicResDto(user);

      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const result = await userService.deleteMe(jwtPayload);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const avatar = req.files.avatar;

      const user = await userService.uploadAvatar(jwtPayload, avatar);
      const result = userPresenter.toPublicResDto(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const user = await userService.deleteAvatar(jwtPayload);
      const result = userPresenter.toPublicResDto(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
