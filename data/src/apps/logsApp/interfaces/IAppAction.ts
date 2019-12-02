import { LogStatus } from "../components/log/enums/LogStatus";
import { AppActionTypes } from "../enums/AppActionTypes";

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
    path: string;
  };
}

export type AppAction =
  | IChangeStatusAction
  | IRemoveAction
  | IAddAction
  | IResetAction
  | ISetJsonPathAction;
