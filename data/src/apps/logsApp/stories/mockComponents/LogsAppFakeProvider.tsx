import * as React from "react";
import { FunctionComponent, PropsWithChildren } from "react";
import { useImmerReducer } from "use-immer";
import { logsAppReducer } from "../../reducers/logsAppReducer";
import { LogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { LogsAppStateContext } from "../../hooks/useLogsAppStateContext";
import { ILogsAppProviderProps, initialState } from "../../LogsAppProvider";
import { useFakeLogSourceEffect } from "../mockHooks/useFakeLogSourceEffect";
import { enableMapSet } from "immer";

export const LogsAppFakeProvider: FunctionComponent<
  PropsWithChildren<ILogsAppProviderProps>
> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(logsAppReducer, {
    ...initialState,
    host: "",
  });
  enableMapSet();

  useFakeLogSourceEffect(dispatch);

  return (
    <LogsAppDispatchContext.Provider value={dispatch}>
      <LogsAppStateContext.Provider value={state}>
        {children}
      </LogsAppStateContext.Provider>
    </LogsAppDispatchContext.Provider>
  );
};
