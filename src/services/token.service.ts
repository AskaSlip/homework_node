import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../config/configs";
import { ActionTokenTypeEnum } from "../emuns/action-token-type.enum";
import { TokenTypeEnum } from "../emuns/token-type.enum";
import { ApiError } from "../errors/api.errors";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = jsonwebtoken.sign(
      payload,
      configs.JWT_REFRESH_SECRET,
      {
        expiresIn: configs.JWT_REFRESH_EXPIRATION,
      },
    );
    return { accessToken, refreshToken };
  }

  public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case TokenTypeEnum.REFRESH:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }
      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError(e.message, 401);
    }
  }

  public generateActionTokens(
    payload: ITokenPayload,
    tokenType: ActionTokenTypeEnum,
  ): string {
    let secret: string;
    let expiresIn: string;

    switch (tokenType) {
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
        expiresIn = configs.ACTION_FORGOT_PASSWORD_EXPIRATION;
        break;
      default:
        throw new ApiError("Invalid token type", 400);
    }

    return jsonwebtoken.sign(payload, secret, { expiresIn });
  }

  public verifyActionToken(
    token: string,
    type: ActionTokenTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
          break;
        default:
          throw new ApiError("Invalid token type", 400);
      }
      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError(e.message, 401);
    }
  }
}

export const tokenService = new TokenService();
