import { TableDisplayActionTypes } from "../enums/TableDisplayActionTypes";
import { TableDisplayRenderTypes } from "../enums/TableDisplayRenderTypes";

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

export interface ISetPathAction extends IBaseTableDisplayAction {
  type: TableDisplayActionTypes.SetPath;
  data: {
    path: string[];
  };
}

export interface ISetRenderTypeAction extends IBaseTableDisplayAction {
  type: TableDisplayActionTypes.SetRenderType;
  data: {
    path: string[];
    type: TableDisplayRenderTypes;
  };
}

export type ITableDisplayAction =
  | IHideAction
  | IShowAction
  | ISetMaxLevelAction
  | ISetPathAction
  | ISetRenderTypeAction;
