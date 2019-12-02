import { Draft } from "immer";
import { AppAction } from "../interfaces/IAppAction";
import { initialState } from "../LogsAppProvider";
import { IAppState } from "../interfaces/IAppState";
import { AppActionTypes } from "../enums/AppActionTypes";
import { query, parse } from "jsonpath";

export function logsAppReducer(
  draft: Draft<IAppState>,
  action: AppAction
): IAppState {
  switch (action.type) {
    case AppActionTypes.Reset:
      return initialState;

    case AppActionTypes.Add:
      draft.logs.push({
        id: action.data.logId,
        data: action.data.logData,
        status: action.data.status
      });
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
      if (!action.data.path) {
        draft.logs = draft.logs.map(log => {
          log.filteredData = undefined;
          return log;
        });
        return draft;
      }
      try {
        parse(action.data.path);
      } catch {
        return draft;
      }
      draft.logs = draft.logs.map(log => {
        log.filteredData = query(log.data, action.data.path);
        return log;
      });

      return draft;
  }
}
