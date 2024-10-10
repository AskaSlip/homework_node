import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/user.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    age: { type: Number, required: true },
    phone: { type: Number, required: false },
    avatar: { type: String, required: false },
    role: { type: String, enum: RoleEnum, default: RoleEnum.USER },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const User = model<IUser>("users", userSchema);
