import * as React from "react";
import { FunctionComponent } from "react";
import { ConnectedResetControl } from "./ResetControl";
import { StyledInputWrapper } from "./styledComponents/StyledInputWrapper";
import { LogCreateForm } from "./LogCreateForm";
import { LogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";

export const Controls: FunctionComponent = () => (
  <StyledInputWrapper>
    <LogCreateForm />
    <ConnectedResetControl />
  </StyledInputWrapper>
);
