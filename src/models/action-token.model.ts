import { model, Schema } from "mongoose";

import { ActionTokenTypeEnum } from "../emuns/action-token-type.enum";
import { IActionToken } from "../interfaces/action-token.interface";
import { User } from "./user.model";

const actionTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    type: { type: String, required: true, enum: ActionTokenTypeEnum },

    _userId: { type: Schema.Types.ObjectId, ref: User, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ActionToken = model<IActionToken>(
  "action-tokens",
  actionTokenSchema,
);
