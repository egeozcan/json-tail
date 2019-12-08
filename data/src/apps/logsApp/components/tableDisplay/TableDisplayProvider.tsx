import * as React from "react";
import { FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { tableDisplayReducer } from "./reducers/tableDisplayReducer";
import { TableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { TableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { ITableDisplayState } from "./interfaces/ITableDisplayState";
import { LogDisplay } from "./LogDisplay";
import { ILog } from "../log/interfaces/ILog";

export const initialState: ITableDisplayState = {
  hiddenPaths: []
};

export interface ITableDisplayProviderProps {
  log: ILog;
}

export const TableDisplayProvider: FunctionComponent<ITableDisplayProviderProps> = ({
  children,
  log
}) => {
  const [state, dispatch] = useImmerReducer(tableDisplayReducer, initialState);

  return (
    <TableDisplayDispatchContext.Provider value={dispatch}>
      <TableDisplayStateContext.Provider value={state}>
        <LogDisplay log={log} />
      </TableDisplayStateContext.Provider>
    </TableDisplayDispatchContext.Provider>
  );
};
