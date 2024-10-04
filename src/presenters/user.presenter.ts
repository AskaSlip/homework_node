import { configs } from "../config/configs";
import { IUser } from "../interfaces/user.interface";

class UserPresenter {
  toPublicResDto(entity: IUser) {
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
    };
  }
}

export const userPresenter = new UserPresenter();
