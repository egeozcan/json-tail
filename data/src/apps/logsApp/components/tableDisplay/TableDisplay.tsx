import { ObjectDisplay } from "./ObjectDisplay";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { FunctionComponent, useCallback } from "react";
import { ContentDisplay } from "./ContentDisplay";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { arraysAreSame } from "./helpers/arraysAreSame";
import { useTableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { useTableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { showSubTree } from "./actionCreators/showSubTree";
import { collapseSubTree } from "./actionCreators/collapseSubTree";
import { StyledCollapseRestoreButton } from "./baseComponents/styledComponents/StyledCollapseRestoreButton";

export interface IBaseLogDisplayProps {
  path: string[];
  logRec?: unknown;
}

export const TableDisplay: FunctionComponent<IBaseLogDisplayProps> = ({
  path = [],
  logRec
}) => {
  const state = useTableDisplayStateContext();
  const dispatch = useTableDisplayDispatchContext();
  const { log: originalLog, maxLevel, hiddenPaths } = state;
  const showLevel = useCallback(
    (path: string[]) => dispatch(showSubTree(path)),
    [dispatch, path]
  );
  const hideLevel = useCallback(
    (path: string[]) => dispatch(collapseSubTree(path)),
    [dispatch, path]
  );
  const hide = useCallback(() => hideLevel(path), [path]);
  const log = typeof(logRec) === "undefined" && path.length === 0 ? originalLog : logRec;

  if (maxLevel !== 0 && path.length >= maxLevel) {
    return <span style={{ background: "red", display: "block" }}>HALT</span>;
  }

  if (
    hiddenPaths &&
    hiddenPaths.find(hiddenPath => arraysAreSame(path, hiddenPath))
  ) {
    return (
      <StyledCollapseRestoreButton onClick={() => showLevel(path)}>
        [+]
      </StyledCollapseRestoreButton>
    );
  }

  if (isRenderableAsString(log)) {
    return <ContentDisplay title={path.join(".")} content={log} />;
  }

  const collapseButton =
    path.length > 0 ? (
      <StyledCollapseRestoreButton onClick={hide}>
        [-]
      </StyledCollapseRestoreButton>
    ) : null;

  if (Array.isArray(log)) {
    return (
      <>
        {collapseButton}
        <ArrayDisplay arr={log} path={path} />
      </>
    );
  }

  if (typeof log === "object" && log !== null) {
    return (
      <>
        {collapseButton}
        <ObjectDisplay obj={log} path={path} />
      </>
    );
  }

  //fingers crossed at this point
  return <ContentDisplay title={path.join(".")} content={String(log)} />;
};
