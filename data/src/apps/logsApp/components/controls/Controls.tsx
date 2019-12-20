import * as React from "react";
import { FunctionComponent } from "react";
import { ConnectedResetControl } from "./ResetControl";
import { InputWrapper } from "../common/InputWrapper";
import { LogCreateForm } from "./LogCreateForm";
import { LogPathSelectorForm } from "./LogPathSelectorForm";
import { ConnectedMaxLevelControl } from "./MaxLevelControl";

export const Controls: FunctionComponent = () => (
  <>
    <InputWrapper>
      <LogPathSelectorForm />
      <ConnectedMaxLevelControl />
    </InputWrapper>
    <InputWrapper>
      <LogCreateForm />
      <ConnectedResetControl />
    </InputWrapper>
  </>
);
