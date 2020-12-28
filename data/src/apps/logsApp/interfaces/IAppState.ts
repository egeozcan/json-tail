import { ILog } from "./ILog";

export interface IAppState {
  logs: ILog[];
  titleSelector: (log: any) => string;
  pathSelector?: string;
  maxLevel: number;
  host: string;
}
