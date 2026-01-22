import type { ChangeEvent, FormEvent, FunctionComponent } from "react";
import { useState } from "react";
import { useLogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { InputWrapper } from "../common/InputWrapper";
import { AppActionTypes } from "../../enums/AppActionTypes";

export interface ILofFormProps {}

export const LogPathSelectorForm: FunctionComponent<ILofFormProps> = () => {
  const [text, setText] = useState("");
  const dispatch = useLogsAppDispatchContext();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const setPath = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: AppActionTypes.SetJsonPath,
      data: {
        path: text,
      },
    });
  };

  return (
    <InputWrapper>
      <form onSubmit={setPath}>
        <input value={text} onChange={changeHandler} />
        <input type={"submit"} value={"set path"} onClick={setPath} />
      </form>
    </InputWrapper>
  );
};
