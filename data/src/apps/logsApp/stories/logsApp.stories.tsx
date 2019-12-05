import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Log } from "../components/log/Log";
import { LogStatus } from "../components/log/enums/LogStatus";
import { FakeLogsApp } from "./FakeLogsApp";

const toppingsLog = {
  data: require("./example-data/topping.json"),
  id: Math.random(),
  status: LogStatus.Shown
};

const atlassianLog = {
  data: require("./example-data/atlassian.json"),
  id: Math.random(),
  status: LogStatus.Shown
};

storiesOf("Logs App", module)
  .add("Topping", () => <Log log={toppingsLog} />)
  .add("Atlassian", () => <Log log={atlassianLog} />)
  .add("Simulation", () => <FakeLogsApp logWebSocketSourceUrl={"foo"} />);
