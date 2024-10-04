import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api.errors";

class FileMiddleware {
  public isFileValid(
    key: string,
    config: { avatarSize: number; avatarType: string[] },
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const file = req.files?.[key] as UploadedFile;
        if (!file) {
          throw new ApiError("File is not found", 400);
        }
        if (file.size > config.avatarSize) {
          throw new ApiError("Avatar size is too big", 400);
        }
        if (!config.avatarType.includes(file.mimetype)) {
          throw new ApiError("Avatar type is invalid", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
