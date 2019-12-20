import { LogStatus } from "../components/log/enums/LogStatus";

export interface ILog {
  id: number;
  data: unknown;
  status: LogStatus;
  time: Date;
}
