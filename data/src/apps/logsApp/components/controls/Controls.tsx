import * as React from "react";
import { FunctionComponent, PropsWithChildren } from "react";
import { ConnectedResetControl } from "./ResetControl";
import { InputWrapper } from "../common/InputWrapper";
import { LogCreateForm } from "./LogCreateForm";
import { LogPathSelectorForm } from "./LogPathSelectorForm";
import { ConnectedMaxLevelControl } from "./MaxLevelControl";
import { LoggedFiles } from "./LoggedFilesForm";

export const Controls: FunctionComponent = () => (
  <>
    <InputWrapper>
      <LoggedFiles />
    </InputWrapper>
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
