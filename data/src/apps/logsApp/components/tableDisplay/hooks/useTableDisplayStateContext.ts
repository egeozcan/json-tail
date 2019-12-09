import * as React from "react";
import { useContext } from "react";
import { ITableDisplayState } from "../interfaces/ITableDisplayState";

export const TableDisplayStateContext = React.createContext(
  {} as ITableDisplayState
);

export const useTableDisplayStateContext = () => {
  return useContext(TableDisplayStateContext);
};
