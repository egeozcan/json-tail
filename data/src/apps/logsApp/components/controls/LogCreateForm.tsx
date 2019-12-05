import * as React from "react";
import { FunctionComponent, useContext, useState } from "react";
import {
  LogsAppDispatchContext,
  useLogsAppDispatchContext
} from "../../hooks/useLogsAppDispatchContext";
import { createLog } from "../../actionCreators/createLog";
import { StyledInputWrapper } from "./styledComponents/StyledInputWrapper";

export interface ILogFormProps {}

export const LogCreateForm: FunctionComponent<ILogFormProps> = () => {
  const [text, setText] = useState("");
  const dispatch = useLogsAppDispatchContext();

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.currentTarget.value);

  const addLog = () => {
    try {
      dispatch(createLog(JSON.parse(text)));
    } catch {
      dispatch(createLog(text));
    }
  };

  //StyledInputWrapper... lol... such laziness :)
  return (
    <StyledInputWrapper>
      <textarea value={text} onChange={changeHandler} />
      <input type={"button"} value={"add log"} onClick={addLog} />
    </StyledInputWrapper>
  );
};
