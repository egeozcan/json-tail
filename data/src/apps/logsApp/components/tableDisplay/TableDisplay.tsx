import { ObjectDisplay } from "./ObjectDisplay";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { FunctionComponent, useCallback } from "react";
import { ContentDisplay } from "./ContentDisplay";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { useTableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { ConnectedToggleButton, ToggleButtonType } from "./ToggleButton";
import { isLevelCollapsed } from "./helpers/isLevelCollapsed";

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
  const { maxLevel, hiddenPaths, shownPaths } = state;

  //not collapsible if renderable as string
  if (isRenderableAsString(log)) {
    return <ContentDisplay title={path.join(".")} content={log} />;
  }

  const expandButton = (
    <ConnectedToggleButton path={path} buttonType={ToggleButtonType.Maximize} />
  );

  if (isLevelCollapsed(maxLevel, path, shownPaths, hiddenPaths)) {
    return expandButton;
  }

  const collapseButton =
    path.length > 0 ? (
      <ConnectedToggleButton
        path={path}
        buttonType={ToggleButtonType.Minimize}
      />
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
