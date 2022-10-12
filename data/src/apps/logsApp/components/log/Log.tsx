import * as React from "react";
import { FunctionComponent, useMemo, PropsWithChildren } from "react";
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

function getNodes(data: unknown, pathSelector: string) {
  try {
    return nodes(data || {}, pathSelector);
  } catch (e) {
    console.error(e);
    return data;
  }
}

export const Log: FunctionComponent<PropsWithChildren<ILogProps>> = ({
  log,
  toggleState,
  setDeleted,
  titleSelector = (log) => String(log.id),
  pathSelector,
  maxLevel = 0,
}) => {
  const logIsShown = log.status === LogStatus.Shown;
  const isUnloading = log.status === LogStatus.Unloading;
  const data = pathSelector ? getNodes(log.data || {}, pathSelector) : log.data;
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
      <RowContainer className={"logContainer"} expandChild={4} key={log.id}>
        {isUnloading ? null : (
          <>
            <TextCopyButton getCopyString={() => JSON.stringify(log.data)} />
            <DownloadButton getUrl={() => `/download?logId=${log.id}`} />
            {toggleButton}
          </>
        )}

        {logElement}
        <DeleteButton
          onClick={() => {
            if (!isUnloading) {
              setDeleted?.();
            }
          }}
        />
      </RowContainer>
    );
  }, [log, titleSelector, maxLevel, pathSelector]);
};
