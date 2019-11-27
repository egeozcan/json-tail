import { Draft } from "immer";
import { AppAction, AppActionTypes } from "./AppAction";
import { IAppState, initialState } from "./LogsAppProvider";

export function logsAppReducer(
  draft: Draft<IAppState>,
  action: AppAction
): IAppState {
  switch (action.type) {
    case AppActionTypes.Reset:
      return initialState;

    case AppActionTypes.Add:
      draft.logs.push(action.data.log);
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
