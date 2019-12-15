import * as React from "react";
import { FunctionComponent } from "react";
import { ConnectedResetControl } from "./ResetControl";
import { StyledInputWrapper } from "./styledComponents/StyledInputWrapper";
import { LogCreateForm } from "./LogCreateForm";
import { LogPathSelectorForm } from "./LogPathSelectorForm";
import { ConnectedMaxLevelControl } from "./MaxLevelControl";

export const Controls: FunctionComponent = () => (
  <>
    <StyledInputWrapper>
      <LogPathSelectorForm />
    </StyledInputWrapper>
    <StyledInputWrapper>
      <LogCreateForm />
      <ConnectedResetControl />
      <ConnectedMaxLevelControl />
    </StyledInputWrapper>
  </>
);
