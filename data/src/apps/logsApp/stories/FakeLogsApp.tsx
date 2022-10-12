import { ConnectedLogList } from "../components/log/LogList";
import { LogsAppProvider } from "../LogsAppProvider";
import * as React from "react";
import { FunctionComponent, PropsWithChildren } from "react";
import { LogsAppFakeProvider } from "./mockComponents/LogsAppFakeProvider";
import { Controls } from "../components/controls/Controls";

export interface ILogsAppProps {
  logWebSocketSourceUrl: string;
}

export const FakeLogsApp: FunctionComponent<
  PropsWithChildren<ILogsAppProps>
> = ({ logWebSocketSourceUrl }) => (
  <LogsAppFakeProvider logWebSocketSourceUrl={logWebSocketSourceUrl}>
    <Controls />
    <ConnectedLogList />
  </LogsAppFakeProvider>
);
