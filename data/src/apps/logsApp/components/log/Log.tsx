import * as React from "react";
import { FunctionComponent, useMemo } from "react";
import { LogStatus } from "./enums/LogStatus";
import { ILog } from "../../interfaces/ILog";
import { ExpandChild, RowContainer } from "../common/RowContainer";
import { LogTitle } from "./styledComponents/LogTitle";
import { TextCopyButton } from "../common/buttons/TextCopyButton";
import { nodes } from "jsonpath";
import { TableDisplay } from "../tableDisplay/TableDisplay";
import { DownloadButton } from "../common/buttons/DownloadButton";
import { ButtonWrapper } from "../common/buttons/ButtonWrapper";
import { plusIcon } from "../common/icons/plusIcon";
import { minusIcon } from "../common/icons/minusIcon";

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
    <ButtonWrapper onClick={toggleState}>
      {logIsShown ? minusIcon : plusIcon}
    </ButtonWrapper>
  ) : null;

  const title = `${log.time.toISOString()} ${titleSelector(data)}`;
  const logElement = logIsShown ? (
    <TableDisplay path={[]} maxLevel={maxLevel} displayObject={data} />
  ) : (
    <LogTitle onClick={toggleState}>{title}</LogTitle>
  );

  return useMemo(() => {
    return (
      <RowContainer
        className={"logContainer"}
        key={log.id}
        expandedChild={ExpandChild.Last}
      >
        <TextCopyButton getCopyString={() => JSON.stringify(log.data)} />
        <DownloadButton getUrl={() => `/download?logId=${log.id}`} />
        {toggleButton}
        {logElement}
      </RowContainer>
    );
  }, [log, titleSelector, maxLevel, pathSelector]);
};
