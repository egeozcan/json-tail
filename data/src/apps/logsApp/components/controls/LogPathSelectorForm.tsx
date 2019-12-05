import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useLogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { StyledInputWrapper } from "./styledComponents/StyledInputWrapper";
import { AppActionTypes } from "../../enums/AppActionTypes";

export interface ILofFormProps {}

export const LogForm: FunctionComponent<ILofFormProps> = () => {
  const [text, setText] = useState("");
  const dispatch = useLogsAppDispatchContext();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const setPath = () => {
    dispatch({
      type: AppActionTypes.SetJsonPath,
      data: {
        path: text
      }
    });
  };

  return (
    <StyledInputWrapper>
      <input value={text} onChange={changeHandler} />
      <input type={"button"} value={"set path"} onClick={setPath} />
    </StyledInputWrapper>
  );
};
