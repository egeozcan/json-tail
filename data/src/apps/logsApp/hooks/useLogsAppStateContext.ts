import * as React from "react";
import { initialState } from "../LogsAppProvider";
import { useContext } from "react";

export const LogsAppStateContext = React.createContext(initialState);

export const useLogsAppStateContext = () => {
  return useContext(LogsAppStateContext);
};
