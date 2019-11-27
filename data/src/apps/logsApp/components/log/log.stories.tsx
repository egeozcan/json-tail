import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Log } from "./Log";
import { LogStatus } from "./LogStatus";

interface IComponentWithDocgenInfo {
  __docgenInfo?: any;
}

const getDocgen = (component: any) => {
  return (component as IComponentWithDocgenInfo).__docgenInfo;
};

storiesOf("Log Message", module)
  .add("Topping", () => (
    <Log
      log={{
        data: require("./example-data/topping.json"),
        id: Math.random(),
        status: LogStatus.Shown
      }}
    />
  ))
  .add("Atlassian", () => (
    <Log
      log={{
        data: require("./example-data/atlassian.json"),
        id: Math.random(),
        status: LogStatus.Shown
      }}
    />
  ));
