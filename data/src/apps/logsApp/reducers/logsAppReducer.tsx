import { Draft } from "immer";
import { AppAction, AppActionTypes } from "../interfaces/IAppAction";
import { initialState } from "../LogsAppProvider";
import { IAppState } from "../interfaces/IAppState";

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
  }
}
