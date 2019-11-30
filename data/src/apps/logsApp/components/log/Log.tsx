import * as React from "react";
import { FunctionComponent } from "react";
import { LogStatus } from "./enums/LogStatus";
import { LogDisplay } from "../table/LogDisplay";
import { ILog } from "./interfaces/ILog";
import { LogContainer } from "./styledComponents/LogContainer";
import { LogToggleButton } from "./styledComponents/LogToggleButton";

export interface ILogProps {
  log: ILog;
  toggleState?: () => void;
  titleSelector?: (log: ILog) => string;
}

export const Log: FunctionComponent<ILogProps> = ({
  log,
  toggleState,
  titleSelector
}) => {
  const logIsShown = log.status === LogStatus.Shown;

  return (
    <LogContainer className={"logContainer"} key={log.id}>
      {toggleState ? (
        <LogToggleButton onClick={toggleState}>
          [{logIsShown ? "-" : "+"}]
        </LogToggleButton>
      ) : null}
      {logIsShown ? (
        <LogDisplay log={log.data} />
      ) : titleSelector ? (
        <span onClick={toggleState}>{titleSelector(log)}</span>
      ) : null}
    </LogContainer>
  );
};
