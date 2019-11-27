import { AppAction, AppActionTypes } from "./AppAction";
import * as React from "react";
import { useImmerReducer } from "use-immer";
import { logsAppReducer } from "./logsAppReducer";
import { ILog } from "./components/log/ILog";
import { FunctionComponent, useEffect } from "react";

export interface IAppState {
  logs: ILog[];
}

export const initialState: IAppState = {
  logs: []
};

type DispatchContextType = React.Dispatch<AppAction>;

export const LogsAppDispatchContext: React.Context<DispatchContextType> = React.createContext(
  //sorry for the escape hatch: will be filled in the component
  {} as DispatchContextType
);

export const LogsAppStateContext = React.createContext(initialState);

export interface ILogsAppProviderProps {
  logWebSocketSourceUrl: string;
  children: React.ReactNode;
}

export const LogsAppProvider: FunctionComponent<ILogsAppProviderProps> = ({
  children,
  logWebSocketSourceUrl
}) => {
  const [state, dispatch] = useImmerReducer(logsAppReducer, initialState);

  useEffect(() => {
    const conn = new WebSocket(logWebSocketSourceUrl);

    conn.onmessage = function(evt) {
      const messages = evt.data.split("\n");

      for (let i = 0; i < messages.length; i++) {
        const log = JSON.parse(messages[i]);

        try {
          log.data = JSON.parse(log.data);
        } catch (e) {
          //no-op
        }

        dispatch({
          type: AppActionTypes.Add,
          data: {
            logId: Date.now(),
            log
          }
        });
      }
    };

    return () => {
      conn.close();
    };
  }, [dispatch, logWebSocketSourceUrl]);

  return (
    <LogsAppDispatchContext.Provider value={dispatch}>
      <LogsAppStateContext.Provider value={state}>
        {children}
      </LogsAppStateContext.Provider>
    </LogsAppDispatchContext.Provider>
  );
};
