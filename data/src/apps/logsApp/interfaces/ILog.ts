import { LogStatus } from "../components/log/enums/LogStatus";

export interface ILog {
  id: number;
  data: unknown;
  path?: string;
  status: LogStatus;
  time: Date;
}
