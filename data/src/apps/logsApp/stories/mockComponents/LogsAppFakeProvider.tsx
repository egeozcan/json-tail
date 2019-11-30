import * as React from "react";
import { FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { logsAppReducer } from "../../reducers/logsAppReducer";
import useWebSocketLogSourceEffect from "../../hooks/useWebSocketLogSourceEffect";
import { LogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { LogsAppStateContext } from "../../hooks/useLogsAppStateContext";
import { ILogsAppProviderProps, initialState } from "../../LogsAppProvider";
import { useFakeLogSourceEffect } from "../mockHooks/useFakeLogSourceEffect";
import { ILog } from "../../components/log/interfaces/ILog";

export const LogsAppFakeProvider: FunctionComponent<ILogsAppProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useImmerReducer(logsAppReducer, initialState);

  useFakeLogSourceEffect(dispatch);

  return (
    <LogsAppDispatchContext.Provider value={dispatch}>
      <LogsAppStateContext.Provider value={state}>
        {children}
      </LogsAppStateContext.Provider>
    </LogsAppDispatchContext.Provider>
  );
};
