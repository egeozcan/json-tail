import { ObjectDisplay } from "./ObjectDisplay";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { FunctionComponent } from "react";
import { ILog } from "../log/ILog";
import { ContentDisplay } from "./ContentDisplay";

interface ILogDisplayProps {
  logMessage: ILog;
  level?: number;
  path?: string[];
}

export const LogDisplay: FunctionComponent<ILogDisplayProps> = ({
  path = [],
  level = 0,
  logMessage,
}) => {
  const data = logMessage.data;

  if (Array.isArray(data)) {
    return <ArrayDisplay arr={data} level={level} path={path} />;
  }
  
  if (data instanceof Date) {
    return <ContentDisplay content={data.toLocaleDateString()} />;
  }
  
  if (typeof data === "object" && data !== null) {
    return <ObjectDisplay obj={data} level={level} path={path} />;
  }
  
  return <ContentDisplay content={String(data)} />;
};
