import * as React from "react";
import { FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { tableDisplayReducer } from "./reducers/tableDisplayReducer";
import { TableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { TableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { ITableDisplayState } from "./interfaces/ITableDisplayState";
import { ILog } from "../log/interfaces/ILog";

export function getInitialState(): ITableDisplayState {
  return {
    hiddenPaths: [],
    maxLevel: 0
  };
}

export interface ITableDisplayProviderProps {}

export const TableDisplayProvider: FunctionComponent<ITableDisplayProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useImmerReducer(
    tableDisplayReducer,
    getInitialState()
  );

  return (
    <TableDisplayDispatchContext.Provider value={dispatch}>
      <TableDisplayStateContext.Provider value={state}>
        {children}
      </TableDisplayStateContext.Provider>
    </TableDisplayDispatchContext.Provider>
  );
};
