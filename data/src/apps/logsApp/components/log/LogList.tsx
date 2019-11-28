import * as React from "react";
import { FunctionComponent } from "react";
import {
  useLogsAppDispatchContext,
  useLogsAppStateContext
} from "../../useContext";
import { Log } from "./Log";
import { ILogListProps } from "./interfaces/ILogListProps";

export const LogList: FunctionComponent<ILogListProps> = ({ logs }) => (
  <div className={"LogsContainer"}>
    {logs.map(log => (
      <Log log={log} />
    ))}
  </div>
);

export const ConnectedLogList: FunctionComponent = () => {
  const appState = useLogsAppStateContext();
  const dispatch = useLogsAppDispatchContext();

  return <LogList logs={appState.logs} />;
};
