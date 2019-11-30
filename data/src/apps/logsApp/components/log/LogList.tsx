import * as React from "react";
import { FunctionComponent } from "react";
import { Log } from "./Log";
import { useLogsAppStateContext } from "../../hooks/useLogsAppStateContext";
import { useLogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { ILog } from "./interfaces/ILog";
import { LogStatus } from "./enums/LogStatus";
import { toggleLogStatusActionCreator } from "../../actionCreators/toggleLog";

export interface ILogListProps {
  logs: ILog[];
  toggleState: (id: number, status: LogStatus) => void;
  titleSelector: (log: ILog) => string;
}

export const LogList: FunctionComponent<ILogListProps> = ({
  logs,
  toggleState,
  titleSelector
}) => (
  <div className={"LogsContainer"}>
    {logs.map(log => (
      <Log
        titleSelector={titleSelector}
        toggleState={() => toggleState(log.id, log.status)}
        log={log}
        key={log.id}
      />
    ))}
  </div>
);

export const ConnectedLogList: FunctionComponent = () => {
  const appState = useLogsAppStateContext();
  const dispatch = useLogsAppDispatchContext();
  const toggleState = (id: number, status: LogStatus) =>
    dispatch(toggleLogStatusActionCreator(id, status));

  return (
    <LogList
      titleSelector={appState.titleSelector}
      logs={appState.logs}
      toggleState={toggleState}
    />
  );
};
