import { ILog } from "./ILog";
import { LogStatus } from "./LogStatus";

export function createLog(
  data: any,
  id: number | null = null,
  status: LogStatus = LogStatus.Shown
): ILog {
  return {
    id: id || Math.random(),
    data: data,
    status
  };
}
