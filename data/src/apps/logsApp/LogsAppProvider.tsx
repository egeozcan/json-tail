import * as React from "react";
import { FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { logsAppReducer } from "./reducers/logsAppReducer";
import { IAppState } from "./interfaces/IAppState";
import useWebSocketLogSourceEffect from "./hooks/useWebSocketLogSourceEffect";
import { LogsAppDispatchContext } from "./hooks/useLogsAppDispatchContext";
import { LogsAppStateContext } from "./hooks/useLogsAppStateContext";
import { ILog } from "./components/log/interfaces/ILog";

export const initialState: IAppState = {
  logs: [],
  titleSelector: (log: ILog) => JSON.stringify(log.data),
  filterPath: ""
};

export interface ILogsAppProviderProps {
  logWebSocketSourceUrl: string;
  children: React.ReactNode;
}

export const LogsAppProvider: FunctionComponent<ILogsAppProviderProps> = ({
  children,
  logWebSocketSourceUrl
}) => {
  const [state, dispatch] = useImmerReducer(logsAppReducer, initialState);

  useWebSocketLogSourceEffect(logWebSocketSourceUrl, dispatch);

  return (
    <LogsAppDispatchContext.Provider value={dispatch}>
      <LogsAppStateContext.Provider value={state}>
        {children}
      </LogsAppStateContext.Provider>
    </LogsAppDispatchContext.Provider>
  );
};
