import { configs } from "../config/configs";
import { IUser, IUserListQuery } from "../interfaces/user.interface";

class UserPresenter {
  public toPublicResDto(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      role: entity.role,
      avatar: entity.avatar
        ? `${configs.AWS_S3_ENDPOINT}/${entity.avatar}`
        : null,
      isVerified: entity.isVerified,
      isDeleted: entity.isDeleted,
      createdAt: entity.createdAt,
    };
  }

  public toListResDto(entities: IUser[], total: number, query: IUserListQuery) {
    return {
      data: entities.map(this.toPublicResDto),
      total,
      ...query,
    };
  }
}

export const userPresenter = new UserPresenter();
