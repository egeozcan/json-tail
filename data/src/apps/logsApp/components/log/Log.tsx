import * as React from "react";
import { FunctionComponent, useMemo } from "react";
import { LogStatus } from "./enums/LogStatus";
import { TableDisplay } from "../tableDisplay/TableDisplay";
import { ILog } from "./interfaces/ILog";
import { LogContainer } from "./styledComponents/LogContainer";
import { LogToggleButton } from "./styledComponents/LogToggleButton";
import { LogTitle } from "./styledComponents/LogTitle";
import { LogCopyButton } from "./styledComponents/LogCopyButton";
import { nodes } from "jsonpath";
import { TableDisplayProvider } from "../tableDisplay/TableDisplayProvider";

export interface ILogProps {
  log: ILog;
  toggleState?: () => void;
  titleSelector?: (log: any) => string;
  pathSelector?: string;
  maxLevel?: number;
}

export const Log: FunctionComponent<ILogProps> = ({
  log,
  toggleState,
  titleSelector = log => String(log.id),
  pathSelector,
  maxLevel = 0
}) => {
  const logIsShown = log.status === LogStatus.Shown;
  let data = log.data;

  if (pathSelector) {
    data = nodes(data || {}, pathSelector);
  }

  const toggleButton = toggleState ? (
    <LogToggleButton onClick={toggleState}>
      [{logIsShown ? "-" : "+"}]
    </LogToggleButton>
  ) : null;

  const logElement = logIsShown ? (
    <TableDisplayProvider maxLevel={maxLevel}>
      <TableDisplay path={[]} log={data} />
    </TableDisplayProvider>
  ) : (
    <LogTitle onClick={toggleState}>{titleSelector(data)}</LogTitle>
  );

  return useMemo(() => {
    return (
      <LogContainer className={"logContainer"} key={log.id}>
        <LogCopyButton getCopyString={() => JSON.stringify(log.data)} />
        {toggleButton}
        {logElement}
      </LogContainer>
    );
  }, [log, titleSelector, maxLevel, pathSelector]);
};
