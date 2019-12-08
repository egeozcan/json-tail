import * as React from "react";
import { ITableDisplayAction } from "../interfaces/ITableDisplayAction";
import { useContext } from "react";

type DispatchContextType = React.Dispatch<ITableDisplayAction>;

export const TableDisplayDispatchContext: React.Context<DispatchContextType> = React.createContext(
  {} as DispatchContextType
);

export const useTableDisplayDispatchContext = () => {
  return useContext(TableDisplayDispatchContext);
};
