import { ActionTokenTypeEnum } from "../emuns/action-token-type.enum";

export interface IActionToken {
  _id?: string;
  _userId: string;
  token: string;
  type: ActionTokenTypeEnum;
}
