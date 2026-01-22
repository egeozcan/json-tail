import { ConnectedLogList } from "../components/log/LogList";
import type { FunctionComponent, PropsWithChildren } from "react";
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
