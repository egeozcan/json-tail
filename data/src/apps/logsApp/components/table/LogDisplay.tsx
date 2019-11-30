import { ObjectDisplay } from "./ObjectDisplay";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { FunctionComponent } from "react";
import { ContentDisplay } from "./ContentDisplay";
import { isRenderableAsString } from "./helpers/isRenderableAsString";

export interface ILogDisplayProps {
  log: any;
  level?: number;
  path?: string[];
}

export const LogDisplay: FunctionComponent<ILogDisplayProps> = ({
  path = [],
  level = 0,
  log
}) => {
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
