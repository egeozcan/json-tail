import * as React from "react";
import { FunctionComponent } from "react";
import { LogStatus } from "./enums/LogStatus";
import { LogDisplay } from "../tableDisplay/LogDisplay";
import { ILog } from "./interfaces/ILog";
import { LogContainer } from "./styledComponents/LogContainer";
import { LogToggleButton } from "./styledComponents/LogToggleButton";
import { LogTitle } from "./styledComponents/LogTitle";
import { LogCopyButton } from "./styledComponents/LogCopyButton";
import { nodes } from "jsonpath";

export interface ILogProps {
  log: ILog;
  toggleState?: () => void;
  titleSelector?: (log: any) => string;
  pathSelector?: string;
}

export const Log: FunctionComponent<ILogProps> = ({
  log,
  toggleState,
  titleSelector = log => String(log.id),
  pathSelector
}) => {
  const logIsShown = log.status === LogStatus.Shown;
  let data = log.data;
  if (pathSelector) {
    data = nodes(data, pathSelector);
  }

  const toggleButton = toggleState ? (
    <LogToggleButton onClick={toggleState}>
      [{logIsShown ? "-" : "+"}]
    </LogToggleButton>
  ) : null;

  const logElement = logIsShown ? (
    <LogDisplay log={data} />
  ) : (
    <LogTitle onClick={toggleState}>{titleSelector(data)}</LogTitle>
  );

  return (
    <LogContainer className={"logContainer"} key={log.id}>
      <LogCopyButton getCopyString={() => JSON.stringify(log.data)} />
      {toggleButton}
      {logElement}
    </LogContainer>
  );
};
