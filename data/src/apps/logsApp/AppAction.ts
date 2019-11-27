import { LogStatus } from "./components/log/LogStatus";

export enum AppActionTypes {
  Reset,
  Add,
  Remove,
  ChangeStatus
}

export interface IResetAction {
  type: AppActionTypes.Reset;
  data: null;
}

export interface IAddAction {
  type: AppActionTypes.Add;
  data: {
    logId: number;
    log: any;
  };
}

export interface IRemoveAction {
  type: AppActionTypes.Remove;
  data: {
    logId: number;
  };
}

export interface IChangeStatusAction {
  type: AppActionTypes.ChangeStatus;
  data: {
    logId: number;
    status: LogStatus;
  };
}

export type AppAction =
  | IChangeStatusAction
  | IRemoveAction
  | IAddAction
  | IResetAction;
