import * as React from "react";
import * as ReactDOM from "react-dom";
import { LogsApp } from "./apps/logsApp/LogsApp";

ReactDOM.render(
  <LogsApp
    logWebSocketSourceUrl={"ws://" + document.location.host + "/tail"}
  />,
  document.getElementById("logApp")
);
