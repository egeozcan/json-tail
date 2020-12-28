import * as React from "react";
import { FunctionComponent } from "react";
import { Log } from "./Log";
import { useLogsAppStateContext } from "../../hooks/useLogsAppStateContext";
import { useLogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { ILog } from "../../interfaces/ILog";
import { LogStatus } from "./enums/LogStatus";
import { toggleLog } from "../../actionCreators/toggleLog";
import { parse } from "jsonpath";
import { ErrorBoundary } from "./LogErrorBoundary";
import { removeLog } from "../../actionCreators/removeLog";

export interface ILogListProps {
  logs: ILog[];
  toggleState: (id: number, status: LogStatus) => void;
  setDeleted: (id: number) => void;
  titleSelector: (log: ILog) => string;
  pathSelector?: string;
  maxLevel: number;
}

export const LogList: FunctionComponent<ILogListProps> = ({
  logs,
  toggleState,
  setDeleted,
  titleSelector,
  pathSelector,
  maxLevel,
}) => (
  <div className={"LogsContainer"}>
    {logs.map((log) => (
      <Log
        maxLevel={maxLevel}
        key={log.id}
        titleSelector={titleSelector}
        toggleState={() => toggleState(log.id, log.status)}
        setDeleted={() => setDeleted(log.id)}
        log={log}
        pathSelector={pathSelector}
      />
    ))}
  </div>
);

export const ConnectedLogList: FunctionComponent = () => {
  const appState = useLogsAppStateContext();
  const dispatch = useLogsAppDispatchContext();
  const toggleState = (id: number, status: LogStatus) =>
    dispatch(toggleLog(id, status));
  const setDeleted = (id: number) => removeLog(id, dispatch, appState.host);

  let pathSelector: string | undefined;

  if (appState.pathSelector) {
    try {
      parse(appState.pathSelector);
      pathSelector = appState.pathSelector;
    } catch {
      console.log("invalid path: " + appState.pathSelector);
    }
  }

  return (
    <LogList
      titleSelector={appState.titleSelector}
      logs={appState.logs}
      toggleState={toggleState}
      setDeleted={setDeleted}
      pathSelector={pathSelector}
      maxLevel={appState.maxLevel}
    />
  );
};
