import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api.errors";
import { ITokenPayload } from "../interfaces/token.interface";
import {
  IUser,
  IUserListQuery,
  IUserListResponse,
} from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(query: IUserListQuery): Promise<IUserListResponse> {
    const [entities, total] = await userRepository.getList(query);
    return userPresenter.toListResDto(entities, total, query);
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    await this.isEmailExistOrThrow(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    return await userRepository.create({ ...dto, password });
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateMe(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(jwtPayload.userId, dto);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    return await userRepository.delete(jwtPayload.userId);
  }

  public async uploadAvatar(
    jwtPayload: ITokenPayload,
    file: any,
  ): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);

    const avatar = await s3Service.uploadFile(
      file,
      FileItemTypeEnum.USER,
      user._id,
    );
    console.log(avatar);
    const updatedUser = await userRepository.updateById(jwtPayload.userId, {
      avatar,
    });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return updatedUser;
  }

  public async deleteAvatar(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return await userRepository.updateById(jwtPayload.userId, {
      avatar: null,
    });
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }
}
export const userService = new UserService();
