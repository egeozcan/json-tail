import { Draft } from "immer";
import { AppAction } from "../interfaces/IAppAction";
import { initialState } from "../LogsAppProvider";
import { IAppState } from "../interfaces/IAppState";
import { AppActionTypes } from "../enums/AppActionTypes";
import { parse } from "jsonpath";
import { ILog } from "../interfaces/ILog";

export function logsAppReducer(
  draft: Draft<IAppState>,
  action: AppAction
): IAppState {
  switch (action.type) {
    case AppActionTypes.Reset:
      return initialState;

    case AppActionTypes.Add:
      const log: ILog = {
        id: action.data.logId,
        data: action.data.logData,
        status: action.data.status,
        time: action.data.time
      };
      draft.logs.push(log);
      return draft;

    case AppActionTypes.ChangeStatus:
      const minMsg = draft.logs.find(m => m.id === action.data.logId);

      if (!minMsg) {
        return draft;
      }

      minMsg.status = action.data.status;
      return draft;

    case AppActionTypes.Remove:
      draft.logs.splice(
        draft.logs.findIndex(m => m.id === action.data.logId),
        1
      );

      return draft;

    case AppActionTypes.SetJsonPath:
      const path = action.data.path;
      if (!path) {
        draft.pathSelector = undefined;
        return draft;
      }
      try {
        parse(path);
      } catch {
        draft.pathSelector = undefined;
        return draft;
      }
      draft.pathSelector = path;
      return draft;

    case AppActionTypes.ChangeMaxLevel:
      draft.maxLevel = action.data.level;
      return draft;
  }
}
