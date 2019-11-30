import { ILog } from "../components/log/interfaces/ILog";

export interface IAppState {
  logs: ILog[];
  titleSelector: (log: ILog) => string;
}
