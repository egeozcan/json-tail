import { ILog } from "../../log/interfaces/ILog";

export type HiddenPath = string[];

export interface ITableDisplayState {
  hiddenPaths: HiddenPath[];
  maxLevel: number;
  log: ILog;
}
