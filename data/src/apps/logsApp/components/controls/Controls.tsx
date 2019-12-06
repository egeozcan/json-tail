import * as React from "react";
import { FunctionComponent } from "react";
import { ConnectedResetControl } from "./ResetControl";
import { StyledInputWrapper } from "./styledComponents/StyledInputWrapper";
import { LogCreateForm } from "./LogCreateForm";
import { LogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { LogPathSelectorForm } from "./LogPathSelectorForm";

export const Controls: FunctionComponent = () => (
  <>
    <StyledInputWrapper>
      <LogPathSelectorForm />
    </StyledInputWrapper>
    <StyledInputWrapper>
      <LogCreateForm />
      <ConnectedResetControl />
    </StyledInputWrapper>
  </>
);
