import { generateTableFromObject } from "./generateTableFromObject";
import { ArrayDisplay } from "./ArrayDisplay";
import * as React from "react";
import { IBaseTableProps } from "./baseComponents/BaseTable";
import { FunctionComponent } from "react";
import { ILog } from "../log/ILog";
import { ContentDisplay } from "./ContentDisplay";

export function render(
  data,
  level: number = 1,
  path: string[] = []
): React.ReactElement<IBaseTableProps> | string {
  if (Array.isArray(data)) {
    return <ArrayDisplay arr={data} level={level} path={path} />;
  }

  if (data instanceof Date) {
    return data.toLocaleDateString();
  }

  if (typeof data === "object" && data !== null) {
    return generateTableFromObject(data, level, path);
  }

  return String(data);
}

interface ILogDisplayProps {
  logMessage: ILog;
  level: number;
  path: string[];
}

export const LogDisplay: FunctionComponent<ILogDisplayProps> = ({
  path,
  level,
  logMessage
}) => {
  const data = logMessage.data;

  if (Array.isArray(data)) {
    return <ArrayDisplay arr={data} level={level} path={path} />;
  }

  if (data instanceof Date) {
    return <ContentDisplay content={data.toLocaleDateString()} />;
  }

  if (typeof data === "object" && data !== null) {
    return generateTableFromObject(data, level, path);
  }

  return <ContentDisplay content={String(data)} />;
};
