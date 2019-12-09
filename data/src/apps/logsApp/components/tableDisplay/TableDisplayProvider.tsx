import * as React from "react";
import { FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { tableDisplayReducer } from "./reducers/tableDisplayReducer";
import { TableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { TableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { ITableDisplayState } from "./interfaces/ITableDisplayState";
import { ILog } from "../log/interfaces/ILog";

export function getInitialState(log: ILog): ITableDisplayState {
  return {
    hiddenPaths: [],
    maxLevel: 50,
    log
  };
}

export interface ITableDisplayProviderProps {
  log: ILog;
}

export const TableDisplayProvider: FunctionComponent<ITableDisplayProviderProps> = ({
  log,
  children
}) => {
  const [state, dispatch] = useImmerReducer(
    tableDisplayReducer,
    getInitialState(log)
  );

  return (
    <TableDisplayDispatchContext.Provider value={dispatch}>
      <TableDisplayStateContext.Provider value={state}>
        {children}
      </TableDisplayStateContext.Provider>
    </TableDisplayDispatchContext.Provider>
  );
};
