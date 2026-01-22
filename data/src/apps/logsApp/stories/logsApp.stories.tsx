import type { Meta, StoryObj } from "@storybook/react";
import { Log } from "../components/log/Log";
import { LogStatus } from "../components/log/enums/LogStatus";
import { FakeLogsApp } from "./FakeLogsApp";

const toppingsLog = {
  data: require("./example-data/topping.json"),
  id: Math.random(),
  status: LogStatus.Shown,
  time: new Date()
};

const atlassianLog = {
  data: require("./example-data/atlassian.json"),
  id: Math.random(),
  status: LogStatus.Shown,
  time: new Date()
};

const meta: Meta<typeof Log> = {
  title: "Logs App",
  component: Log,
};

export default meta;

type Story = StoryObj<typeof Log>;

export const Topping: Story = {
  render: () => <Log log={toppingsLog} />,
};

export const Atlassian: Story = {
  render: () => <Log log={atlassianLog} />,
};

export const Simulation: StoryObj<typeof FakeLogsApp> = {
  render: () => <FakeLogsApp logWebSocketSourceUrl="foo" />,
};
