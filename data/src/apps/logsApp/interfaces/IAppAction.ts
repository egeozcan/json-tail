import { LogStatus } from "../components/log/enums/LogStatus";
import { AppActionTypes } from "../enums/AppActionTypes";
import { ILoggedFile } from "./IAppState";

export interface IAppAction {
  type: AppActionTypes;
}

export interface IResetAction extends IAppAction {
  type: AppActionTypes.Reset;
  data: null;
}

export interface IAddAction extends IAppAction {
  type: AppActionTypes.Add;
  data: {
    logId: number;
    logData: unknown;
    status: LogStatus;
    time: Date;
  };
}

export interface IRemoveAction extends IAppAction {
  type: AppActionTypes.Remove;
  data: {
    logId: number;
  };
}

export interface IChangeStatusAction extends IAppAction {
  type: AppActionTypes.ChangeStatus;
  data: {
    logId: number;
    status: LogStatus;
  };
}

export interface ISetJsonPathAction extends IAppAction {
  type: AppActionTypes.SetJsonPath;
  data: {
    path?: string;
  };
}

export interface IChangeLevelAction extends IAppAction {
  type: AppActionTypes.ChangeMaxLevel;
  data: {
    level: number;
  };
}

export interface ISetFilesAction extends IAppAction {
  type: AppActionTypes.SetFiles;
  data: {
    files: ILoggedFile[];
  };
}

export type AppAction =
  | IChangeStatusAction
  | IRemoveAction
  | IAddAction
  | IResetAction
  | ISetJsonPathAction
  | IChangeLevelAction
  | ISetFilesAction;
