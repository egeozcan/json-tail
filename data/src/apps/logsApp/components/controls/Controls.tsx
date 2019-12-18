import * as React from "react";
import { FunctionComponent } from "react";
import { ConnectedResetControl } from "./ResetControl";
import { StyledInputWrapper } from "../common/StyledInputWrapper";
import { LogCreateForm } from "./LogCreateForm";
import { LogPathSelectorForm } from "./LogPathSelectorForm";
import { ConnectedMaxLevelControl } from "./MaxLevelControl";

export const Controls: FunctionComponent = () => (
  <>
    <StyledInputWrapper>
      <LogPathSelectorForm />
      <ConnectedMaxLevelControl />
    </StyledInputWrapper>
    <StyledInputWrapper>
      <LogCreateForm />
      <ConnectedResetControl />
    </StyledInputWrapper>
  </>
);
