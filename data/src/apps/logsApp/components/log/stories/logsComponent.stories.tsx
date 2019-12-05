import * as React from "react";
import { storiesOf } from "@storybook/react";
import { LogCopyButton } from "../styledComponents/LogCopyButton";

storiesOf("Log Stuff", module).add("Copy Button", () => (
  <LogCopyButton getCopyString={() => "Test"} />
));