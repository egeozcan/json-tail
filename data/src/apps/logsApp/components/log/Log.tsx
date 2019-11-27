import * as React from "react";
import { LogDisplay } from "../table/LogDisplay";
import { ILog } from "./ILog";
import { FunctionComponent } from "react";

export interface IMessageProps {
  log: ILog;
}

export const Log: FunctionComponent<IMessageProps> = ({ log }) => (
  <div key={log.id}><LogDisplay logMessage={log} /></div>
);
