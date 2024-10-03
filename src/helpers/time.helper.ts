import dayjs, { ManipulateType } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
class TimeHelper {
  public substractByParams(value: number, unit: ManipulateType) {
    return dayjs().subtract(value, unit).toDate();
  }
  public parseConfigString(string: string) {
    const [value, unit] = string.split(" ");
    return { value: parseInt(value), unit: unit as ManipulateType };
  }
}

export const timeHelper = new TimeHelper();
