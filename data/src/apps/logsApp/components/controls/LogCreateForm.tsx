import type { ChangeEvent, FunctionComponent } from "react";
import { useState } from "react";
import { createLogInternal } from "../../actionCreators/createLog";
import { InputWrapper } from "../common/InputWrapper";

export interface ILogFormProps {}

export const LogCreateForm: FunctionComponent<ILogFormProps> = () => {
  const [text, setText] = useState("");

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.currentTarget.value);

  const addLog = () => createLogInternal(text);

  //StyledInputWrapper... lol... such laziness :)
  return (
    <InputWrapper>
      <textarea
        placeholder={"Paste JSON Here"}
        value={text}
        onChange={changeHandler}
      />
      <input type={"button"} value={"add log"} onClick={addLog} />
    </InputWrapper>
  );
};
