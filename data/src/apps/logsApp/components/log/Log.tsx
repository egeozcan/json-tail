import * as React from "react";
import { renderX } from "../table";
import { ILog } from "./ILog";
import { FunctionComponent } from "react";

export interface IMessageProps {
  log: ILog;
}

export const Log: FunctionComponent<IMessageProps> = ({ log }) => (
  <div key={log.id}>{renderX(log.data)}</div>
);
