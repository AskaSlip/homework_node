import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldPasswordRepository } from "../repositories/old-password.repository";

const handler = async () => {
  try {
    const date = timeHelper.substractByParams(90, "days");
    const deletedCount = await oldPasswordRepository.deleteManyByParams(date);
    console.log(`Deleted ${deletedCount}  old passwords`);
  } catch (e) {
    console.error(e);
  }
};

export const removeOldPasswordsCronJob = new CronJob(
  "0,20,40 * * * * *",
  handler,
);
