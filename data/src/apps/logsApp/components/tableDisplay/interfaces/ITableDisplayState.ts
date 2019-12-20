import { ILog } from "../../../interfaces/ILog";

export type HiddenPath = string[];
export type ShownPath = string[];

export interface ITableDisplayState {
  hiddenPaths: HiddenPath[];
  shownPaths: ShownPath[];
  maxLevel: number;
}
