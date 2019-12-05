import { IResetAction } from "../interfaces/IAppAction";
import { AppActionTypes } from "../enums/AppActionTypes";

export function resetLogs(): IResetAction {
  return {
    type: AppActionTypes.Reset,
    data: null
  };
}
