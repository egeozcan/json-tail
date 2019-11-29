import { ConnectedLogList } from "../components/log/LogList";
import { LogsAppProvider } from "../LogsAppProvider";
import * as React from "react";
import { FunctionComponent } from "react";
import { LogsAppFakeProvider } from "./mockComponents/LogsAppFakeProvider";

export interface ILogsAppProps {
  logWebSocketSourceUrl: string;
}

export const FakeLogsApp: FunctionComponent<ILogsAppProps> = ({
  logWebSocketSourceUrl
}) => (
  <LogsAppFakeProvider logWebSocketSourceUrl={logWebSocketSourceUrl}>
    <ConnectedLogList />
  </LogsAppFakeProvider>
);
