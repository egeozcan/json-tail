import { ObjectDisplay } from "./ObjectDisplay";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { FunctionComponent } from "react";
import { ContentDisplay } from "./ContentDisplay";
import { isRenderableAsString } from "./helpers/isRenderableAsString";
import { ILogDisplayProps } from "./interfaces/ILogDisplayProps";

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

  if (log instanceof Date) {
    return <ContentDisplay content={log.toLocaleDateString()} />;
  }

  if (typeof log === "object" && log !== null) {
    return <ObjectDisplay obj={log} level={level} path={path} />;
  }

  return <ContentDisplay title={path.join(".")} content={String(log)} />;
};
