import * as React from "react";
import { storiesOf } from "@storybook/react";
import { TextCopyButton } from "../../common/buttons/TextCopyButton";

storiesOf("Other Stuff", module).add("Copy Button", () => (
  <TextCopyButton getCopyString={() => "Test"} />
));
