import { ILog } from "../log/ILog";
import * as React from "react";
import { useLogsAppStateContext } from "../../useContext";
import { FunctionComponent } from "react";
import { Log } from "../log/Log";

export interface ILogListProps {
  logs: ILog[];
}

export const LogList: FunctionComponent<ILogListProps> = ({ logs }) => (
  <div className={"LogsContainer"}>
    {logs.map(log => (
      <Log log={log} />
    ))}
  </div>
);

export const ConnectedLogList: FunctionComponent = () => {
  const appState = useLogsAppStateContext();

  return <LogList logs={appState.logs} />;
};
