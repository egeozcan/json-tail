import * as React from "react";
import { FunctionComponent, useMemo } from "react";
import { LogStatus } from "./enums/LogStatus";
import { TableDisplay } from "../tableDisplay/TableDisplay";
import { ILog } from "./interfaces/ILog";
import { LogContainer } from "./styledComponents/LogContainer";
import { LogTitle } from "./styledComponents/LogTitle";
import { TextCopyButton } from "../common/TextCopyButton";
import { nodes } from "jsonpath";
import { TableDisplayProvider } from "../tableDisplay/TableDisplayProvider";
import { LogDownloadButton } from "./styledComponents/LogDownloadButton";
import { StyledButtonWrapper } from "../common/StyledButtonWrapper";

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
    <StyledButtonWrapper onClick={toggleState}>
      [{logIsShown ? "-" : "+"}]
    </StyledButtonWrapper>
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
        <TextCopyButton getCopyString={() => JSON.stringify(log.data)} />
        <LogDownloadButton getUrl={() => `/download?logId=${log.id}`} />
        {toggleButton}
        {logElement}
      </LogContainer>
    );
  }, [log, titleSelector, maxLevel, pathSelector]);
};
