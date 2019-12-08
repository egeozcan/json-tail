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
  hiddenPaths: [],
  maxLevel: 50
};

export interface ITableDisplayProviderProps {
  log: ILog;
}

export const TableDisplayProvider: FunctionComponent<ITableDisplayProviderProps> = ({
  log
}) => {
  const [state, dispatch] = useImmerReducer(tableDisplayReducer, initialState);

  return (
    <TableDisplayDispatchContext.Provider value={dispatch}>
      <TableDisplayStateContext.Provider value={state}>
        <LogDisplay log={log} path={[]} />
      </TableDisplayStateContext.Provider>
    </TableDisplayDispatchContext.Provider>
  );
};
