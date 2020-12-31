import { default as React, FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { logsAppReducer } from "./reducers/logsAppReducer";
import { IAppState } from "./interfaces/IAppState";
import useWebSocketLogSourceEffect from "./hooks/useWebSocketLogSourceEffect";
import { LogsAppDispatchContext } from "./hooks/useLogsAppDispatchContext";
import { LogsAppStateContext } from "./hooks/useLogsAppStateContext";
import { enableMapSet } from "immer";

export const initialState: IAppState = {
  logs: [],
  displayedLogs: [],
  titleSelector: (log: any) => JSON.stringify(log),
  pathSelector: "",
  maxLevel: 5,
  host: "/",
  files: [],
};

export interface ILogsAppProviderProps {
  logWebSocketSourceUrl: string;
  children: React.ReactNode;
}

export const LogsAppProvider: FunctionComponent<ILogsAppProviderProps> = ({
  children,
  logWebSocketSourceUrl,
}) => {
  const [state, dispatch] = useImmerReducer(logsAppReducer, initialState);
  enableMapSet();

  useWebSocketLogSourceEffect(logWebSocketSourceUrl, dispatch);

  return (
    <LogsAppDispatchContext.Provider value={dispatch}>
      <LogsAppStateContext.Provider value={state}>
        {children}
      </LogsAppStateContext.Provider>
    </LogsAppDispatchContext.Provider>
  );
};
