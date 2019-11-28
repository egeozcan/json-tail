import { ConnectedLogList } from "./components/log/LogList";
import { LogsAppProvider } from "./LogsAppProvider";
import * as React from "react";
import { FunctionComponent } from "react";

export interface ILogsAppProps {
  logWebSocketSourceUrl: string;
}

export const LogsApp: FunctionComponent<ILogsAppProps> = ({
  logWebSocketSourceUrl
}) => (
  <LogsAppProvider logWebSocketSourceUrl={logWebSocketSourceUrl}>
    <ConnectedLogList />
  </LogsAppProvider>
);
