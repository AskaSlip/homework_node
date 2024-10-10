import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/user.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";
import { PickRequired } from "../types/pick-required-type";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  phone?: string;
  role: RoleEnum;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: string;
}

export type ISignIn = Pick<IUser, "email" | "password">;
export type IResetPasswordSend = Pick<IUser, "email">;
export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };
export type IChangePassword = Pick<IUser, "password"> & { oldPassword: string };
export interface IUserListQuery {
  limit?: number;
  page?: number;
  search?: string;
  orderBy?: UserListOrderByEnum;
  order?: OrderEnum;
}

export type IUserResponse = Pick<
  IUser,
  "name" | "email" | "age" | "role" | "avatar" | "isDeleted" | "isVerified"
> &
  PickRequired<IUser, "_id" | "createdAt">;

export interface IUserListResponse {
  data: IUserResponse[];
  total: number;
}
