import { EmailTypeEnum } from "../emuns/email-type.enum";
import { EmailPayloadCombined } from "./email-payload-combined.type";
import { PickRequired } from "./pick-required-type";

export type EmailTypeToPayload = {
  [EmailTypeEnum.WELCOME]: PickRequired<
    EmailPayloadCombined,
    "name" | "email" | "actionToken"
  >;

  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailPayloadCombined,
    "name" | "email" | "actionToken"
  >;

  [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailPayloadCombined, "email">;

  [EmailTypeEnum.LOGOUT]: PickRequired<EmailPayloadCombined, "name">;

  [EmailTypeEnum.LOGOUT_ALL]: PickRequired<
    EmailPayloadCombined,
    "email" | "name"
  >;
};
