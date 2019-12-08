import * as React from "react";
import { initialState } from "../TableDisplayProvider";
import { useContext } from "react";

export const TableDisplayStateContext = React.createContext(initialState);

export const useTableDisplayStateContext = () => {
  return useContext(TableDisplayStateContext);
};
