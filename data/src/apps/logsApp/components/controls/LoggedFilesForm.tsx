import * as React from "react";
import { FunctionComponent, useState } from "react";
import { InputWrapper } from "../common/InputWrapper";
import {
  addLoggedFile,
  removeLoggedFile,
} from "../../actionCreators/loggedFile";
import { useLogsAppStateContext } from "../../hooks/useLogsAppStateContext";

export interface ILoggedFilesControlProps {}

export const LoggedFiles: FunctionComponent<ILoggedFilesControlProps> = () => {
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const state = useLogsAppStateContext();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.currentTarget.value);
  };

  const addFile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    addLoggedFile(path, state.host)
      .then(() => {
        setLoading(false);
        setPath("");
      })
      .catch(() => setLoading(false));
  };

  const removeFile = (filePath: string) => {
    setLoading(true);
    removeLoggedFile(filePath, state.host)
      .then(() => {
        setLoading(false);
        setPath("");
      })
      .catch(() => setLoading(false));
  };

  return (
    <InputWrapper>
      <form onSubmit={addFile}>
        <input
          value={path}
          style={{ flex: 1 }}
          onChange={changeHandler}
          disabled={loading}
        />
        <input
          type="submit"
          value="add file"
          onClick={addFile}
          disabled={loading}
        />
      </form>
      <ul>
        {state.files.map((file) => (
          <li key={file.path}>
            {file.path}{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                removeFile(file.path);
              }}
            >
              DELETE
            </a>
          </li>
        ))}
      </ul>
    </InputWrapper>
  );
};
