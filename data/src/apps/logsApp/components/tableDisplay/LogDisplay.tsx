import { ObjectDisplay } from "./ObjectDisplay";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { FunctionComponent } from "react";
import { ContentDisplay } from "./ContentDisplay";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { ITableDisplayState } from "./interfaces/ITableDisplayState";
import { arraysAreSame } from "./helpers/arraysAreSame";

export interface IBaseLogDisplayProps {
  level?: number;
  path: string[];
}

export interface ILogDisplayProps extends IBaseLogDisplayProps {
  log: any;
}

export const LogDisplay: FunctionComponent<ILogDisplayProps &
  Partial<ITableDisplayState>> = ({
  path = [],
  level = 0,
  log,
  hiddenPaths,
  maxLevel
}) => {
  if (
    hiddenPaths &&
    hiddenPaths.find(hiddenPath => arraysAreSame(path, hiddenPath))
  ) {
    return <></>;
  }

  if (isRenderableAsString(log)) {
    return <ContentDisplay title={path.join(".")} content={log} />;
  }

  if (Array.isArray(log)) {
    return <ArrayDisplay arr={log} level={level} path={path} />;
  }

  if (typeof log === "object" && log !== null) {
    return <ObjectDisplay obj={log} level={level} path={path} />;
  }

  //fingers crossed at this point
  return <ContentDisplay title={path.join(".")} content={String(log)} />;
};

export const ConnectedLogDisplay: FunctionComponent<ILogDisplayProps> = ({
  level,
  log,
  path
}) => <></>;
