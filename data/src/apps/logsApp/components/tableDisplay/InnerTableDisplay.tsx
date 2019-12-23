import { ObjectDisplay } from "./ObjectDisplay";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { FunctionComponent, useCallback } from "react";
import { ContentDisplay } from "./ContentDisplay";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { useTableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { ConnectedToggleButton, ToggleButtonType } from "./ToggleButton";
import { isLevelCollapsed } from "./helpers/isLevelCollapsed";

export interface IBaseInnerTableDisplayProps {
  //this is here because it will be recursively passed to itself
  path: string[];
}

export interface IInnerTableDisplayProps extends IBaseInnerTableDisplayProps {
  displayObject: unknown;
}

/**
 * The table display for an arbitrary object. It needs to be in the table display state and dispatch contexts.
 * @see useTableDisplayStateContext
 * @see useTableDisplayDispatchContext
 */
export const InnerTableDisplay: FunctionComponent<IInnerTableDisplayProps> = ({
  path = [],
  displayObject
}) => {
  const state = useTableDisplayStateContext();
  const { maxLevel, hiddenPaths, shownPaths } = state;

  //not collapsible if renderable as string
  if (isRenderableAsString(displayObject)) {
    return <ContentDisplay title={path.join(".")} content={displayObject} />;
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

  if (Array.isArray(displayObject)) {
    return (
      <>
        {collapseButton}
        <ArrayDisplay arr={displayObject} path={path} />
      </>
    );
  }

  if (typeof displayObject === "object" && displayObject !== null) {
    return (
      <>
        {collapseButton}
        <ObjectDisplay obj={displayObject} path={path} />
      </>
    );
  }

  //fingers crossed at this point
  return (
    <ContentDisplay title={path.join(".")} content={String(displayObject)} />
  );
};
