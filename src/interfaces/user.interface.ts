import { RoleEnum } from "../emuns/user.enum";

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
}

export type ISignIn = Pick<IUser, "email" | "password">;
export type IResetPasswordSend = Pick<IUser, "email">;
export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };
