import * as React from "react";
import { FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { tableDisplayReducer } from "./reducers/tableDisplayReducer";
import { TableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { TableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { ITableDisplayState } from "./interfaces/ITableDisplayState";
import { TableDisplayActionTypes } from "./enums/TableDisplayActionTypes";

export const initialState: ITableDisplayState = {
  hiddenPaths: [],
  maxLevel: 0
};

export interface ITableDisplayProviderProps {
  maxLevel: number;
}

export const TableDisplayProvider: FunctionComponent<ITableDisplayProviderProps> = ({
  children,
  maxLevel
}) => {
  const [state, dispatch] = useImmerReducer(tableDisplayReducer, initialState);

  if (state.maxLevel !== maxLevel) {
    dispatch({
      type: TableDisplayActionTypes.SetMaxLevel,
      data: {
        level: maxLevel
      }
    });
  }

  return (
    <TableDisplayDispatchContext.Provider value={dispatch}>
      <TableDisplayStateContext.Provider value={state}>
        {children}
      </TableDisplayStateContext.Provider>
    </TableDisplayDispatchContext.Provider>
  );
};
