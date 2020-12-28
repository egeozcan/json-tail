import { default as React, FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { logsAppReducer } from "./reducers/logsAppReducer";
import { IAppState } from "./interfaces/IAppState";
import useWebSocketLogSourceEffect from "./hooks/useWebSocketLogSourceEffect";
import { LogsAppDispatchContext } from "./hooks/useLogsAppDispatchContext";
import { LogsAppStateContext } from "./hooks/useLogsAppStateContext";

export const initialState: IAppState = {
  logs: [],
  titleSelector: (log: any) => JSON.stringify(log),
  pathSelector: "",
  maxLevel: 5,
  host: "/",
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

  useWebSocketLogSourceEffect(logWebSocketSourceUrl, dispatch);

  return (
    <LogsAppDispatchContext.Provider value={dispatch}>
      <LogsAppStateContext.Provider value={state}>
        {children}
      </LogsAppStateContext.Provider>
    </LogsAppDispatchContext.Provider>
  );
};
