import * as React from "react";
import { FunctionComponent, useMemo } from "react";
import { LogStatus } from "./enums/LogStatus";
import { ILog } from "../../interfaces/ILog";
import { RowContainer } from "../common/RowContainer";
import { LogTitle } from "./styledComponents/LogTitle";
import { TextCopyButton } from "../common/buttons/TextCopyButton";
import { nodes } from "jsonpath";
import { TableDisplay } from "../tableDisplay/TableDisplay";
import { DownloadButton } from "../common/buttons/DownloadButton";
import { ButtonWrapper } from "../common/buttons/ButtonWrapper";
import { plusIcon } from "../common/icons/plusIcon";
import { minusIcon } from "../common/icons/minusIcon";
import { DeleteButton } from "../common/buttons/DeleteButton";
import { Block, Size } from "../common/Block";

export interface ILogProps {
  log: ILog;
  toggleState?: () => void;
  setDeleted?: () => void;
  titleSelector?: (log: any) => string;
  pathSelector?: string;
  maxLevel?: number;
}

export const Log: FunctionComponent<ILogProps> = ({
  log,
  toggleState,
  setDeleted,
  titleSelector = (log) => String(log.id),
  pathSelector,
  maxLevel = 0,
}) => {
  const logIsShown = log.status === LogStatus.Shown;
  const isUnloading = log.status === LogStatus.Unloading;
  const data = pathSelector ? nodes(log.data || {}, pathSelector) : log.data;
  const title = `${log.time.toISOString()} ${titleSelector(data)}`;

  const toggleButton = toggleState ? (
    <ButtonWrapper onClick={toggleState}>
      {logIsShown ? minusIcon : plusIcon}
    </ButtonWrapper>
  ) : null;

  const logElement = isUnloading ? (
    <LogTitle>{"Removing..."}</LogTitle>
  ) : logIsShown ? (
    <Block size={Size.Expand}>
      <TableDisplay path={[]} maxLevel={maxLevel} displayObject={data} />
    </Block>
  ) : (
    <LogTitle onClick={toggleState}>{title}</LogTitle>
  );

  return useMemo(() => {
    return (
      <RowContainer className={"logContainer"} key={log.id}>
        {isUnloading ? null : (
          <>
            <TextCopyButton getCopyString={() => JSON.stringify(log.data)} />
            <DownloadButton getUrl={() => `/download?logId=${log.id}`} />
            {toggleButton}
          </>
        )}

        {logElement}
        {logIsShown && setDeleted ? (
          <DeleteButton onClick={setDeleted} />
        ) : null}
      </RowContainer>
    );
  }, [log, titleSelector, maxLevel, pathSelector]);
};
