import { TableDisplayActionTypes } from "../enums/TableDisplayActionTypes";

export interface IBaseTableDisplayAction {
  type: TableDisplayActionTypes;
}

export interface IHideAction extends IBaseTableDisplayAction {
  type: TableDisplayActionTypes.HidePath;
  data: {
    path: string[];
  };
}

export interface IShowAction extends IBaseTableDisplayAction {
  type: TableDisplayActionTypes.ShowPath;
  data: {
    path: string[];
  };
}

export interface ISetMaxLevelAction extends IBaseTableDisplayAction {
  type: TableDisplayActionTypes.SetMaxLevel;
  data: {
    level: number;
  };
}

export type ITableDisplayAction =
  | IHideAction
  | IShowAction
  | ISetMaxLevelAction;
