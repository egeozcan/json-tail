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
import { StyledButtonWrapper } from "./baseComponents/styledComponents/StyledButtonWrapper";

export interface IBaseLogDisplayProps {
  //this is here because it will be recursively passed to itself
  path: string[];
}

export interface ITableDisplayProps extends IBaseLogDisplayProps {
  log: unknown;
}

export const TableDisplay: FunctionComponent<ITableDisplayProps> = ({
  path = [],
  log
}) => {
  const state = useTableDisplayStateContext();
  const dispatch = useTableDisplayDispatchContext();
  const { maxLevel, hiddenPaths } = state;
  const showLevel = useCallback(
    (path: string[]) => dispatch(showSubTree(path)),
    [dispatch, path]
  );
  const hideLevel = useCallback(
    (path: string[]) => dispatch(collapseSubTree(path)),
    [dispatch, path]
  );
  const hide = useCallback(() => hideLevel(path), [path]);

  if (maxLevel !== 0 && path.length >= maxLevel) {
    return (
      <span style={{ background: "red", display: "block", color: "white" }}>
        MAX DEPTH
      </span>
    );
  }

  if (
    hiddenPaths &&
    hiddenPaths.find(hiddenPath => arraysAreSame(path, hiddenPath))
  ) {
    return (
      <StyledButtonWrapper onClick={() => showLevel(path)}>
        [+]
      </StyledButtonWrapper>
    );
  }

  if (isRenderableAsString(log)) {
    return <ContentDisplay title={path.join(".")} content={log} />;
  }

  const collapseButton =
    path.length > 0 ? (
      <StyledButtonWrapper onClick={hide}>[-]</StyledButtonWrapper>
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
