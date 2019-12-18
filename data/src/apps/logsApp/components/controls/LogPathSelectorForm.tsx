import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useLogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { StyledInputWrapper } from "../common/StyledInputWrapper";
import { AppActionTypes } from "../../enums/AppActionTypes";

export interface ILofFormProps {}

export const LogPathSelectorForm: FunctionComponent<ILofFormProps> = () => {
  const [text, setText] = useState("");
  const dispatch = useLogsAppDispatchContext();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const setPath = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: AppActionTypes.SetJsonPath,
      data: {
        path: text
      }
    });
  };

  return (
    <StyledInputWrapper>
      <form onSubmit={setPath}>
        <input value={text} onChange={changeHandler} />
        <input type={"submit"} value={"set path"} onClick={setPath} />
      </form>
    </StyledInputWrapper>
  );
};
