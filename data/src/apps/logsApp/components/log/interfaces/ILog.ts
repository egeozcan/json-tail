import { LogStatus } from "../enums/LogStatus";

export interface ILog {
  id: number;
  data: unknown;
  status: LogStatus;
  filteredData?: unknown;
}
