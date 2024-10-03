import { CronJob } from "cron";

const handler = async () => {
  console.log("Running Test Cron");
};

export const testCronJob = new CronJob("* 10 * * * *", handler);
