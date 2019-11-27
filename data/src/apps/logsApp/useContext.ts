import { useContext } from "react";
import { LogsAppDispatchContext, LogsAppStateContext } from "./LogsAppProvider";

export const useLogsAppStateContext = () => {
  return useContext(LogsAppStateContext);
};

export const useLogsAppDispatchContext = () => {
  return useContext(LogsAppDispatchContext);
};
