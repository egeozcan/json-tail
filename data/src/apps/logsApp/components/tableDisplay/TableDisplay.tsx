import { ObjectDisplay } from "./ObjectDisplay";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { FunctionComponent } from "react";
import { ContentDisplay } from "./ContentDisplay";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { arraysAreSame } from "./helpers/arraysAreSame";
import { useTableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { useTableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { showSubTree } from "./actionCreators/showSubTree";
import { collapseSubTree } from "./actionCreators/collapseSubTree";

export interface IBaseLogDisplayProps {
  level: number;
  path: string[];
  logRec?: unknown;
}

export const TableDisplay: FunctionComponent<IBaseLogDisplayProps> = ({
  path = [],
  level = 0,
  logRec
}) => {
  const state = useTableDisplayStateContext();
  const dispatch = useTableDisplayDispatchContext();
  const { log: originalLog, maxLevel, hiddenPaths } = state;
  const showLevel = (path: string[]) => dispatch(showSubTree(path));
  const hideLevel = (path: string[]) => dispatch(collapseSubTree(path));
  const log = logRec || originalLog;

  if (
    hiddenPaths &&
    hiddenPaths.find(hiddenPath => arraysAreSame(path, hiddenPath))
  ) {
    return (
      <span className={"pathToggle"} onClick={() => showLevel(path)}>
        [+]
      </span>
    );
  }

  if (maxLevel && level >= maxLevel) {
    return <></>;
  }

  if (isRenderableAsString(log)) {
    return <ContentDisplay title={path.join(".")} content={log} />;
  }

  if (Array.isArray(log)) {
    return (
      <>
        <span className={"pathToggle"} onClick={() => hideLevel(path)}>
          [-]
        </span>
        <ArrayDisplay arr={log} level={level} path={path} />
      </>
    );
  }

  if (typeof log === "object" && log !== null) {
    return (
      <>
        <span className={"pathToggle"} onClick={() => hideLevel(path)}>
          [-]
        </span>
        <ObjectDisplay obj={log} level={level} path={path} />
      </>
    );
  }

  //fingers crossed at this point
  return <ContentDisplay title={path.join(".")} content={String(log)} />;
};
