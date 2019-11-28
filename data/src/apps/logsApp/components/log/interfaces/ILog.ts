import { LogStatus } from "../LogStatus";

export interface ILog {
  id: number;
  data: any;
  status: LogStatus;
}
