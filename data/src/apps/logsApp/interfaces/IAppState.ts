import { ILog } from "./ILog";

export interface ILoggedFile {
  path: string;
}

export interface IAppState {
  logs: ILog[];
  titleSelector: (log: any) => string;
  pathSelector?: string;
  maxLevel: number;
  host: string;
  files: ILoggedFile[];
}
