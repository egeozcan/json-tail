import * as React from "react";
import { FunctionComponent } from "react";
import { LogStatus } from "./LogStatus";
import { LogDisplay } from "../table/LogDisplay";
import { IMessageProps } from "./interfaces/IMessageProps";

export const Log: FunctionComponent<IMessageProps> = ({ log }) => (
  <div className={"logContainer"} key={log.id}>
    {log.status === LogStatus.Shown ? <LogDisplay log={log.data} /> : ""}
  </div>
);
