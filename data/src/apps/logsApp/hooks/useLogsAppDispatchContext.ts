import * as React from "react";
import { AppAction } from "../interfaces/IAppAction";
import { useContext } from "react";

type DispatchContextType = React.Dispatch<AppAction>;

export const LogsAppDispatchContext: React.Context<DispatchContextType> = React.createContext(
  //sorry for the escape hatch: will be filled in the component
  {} as DispatchContextType
);

export const useLogsAppDispatchContext = () => {
  return useContext(LogsAppDispatchContext);
};
