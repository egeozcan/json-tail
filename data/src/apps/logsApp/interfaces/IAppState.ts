import { ILog } from "../components/log/interfaces/ILog";

export interface IAppState {
  logs: ILog[];
  titleSelector: (log: any) => string;
  pathSelector?: string;
}
