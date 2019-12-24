import { default as React, FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { tableDisplayReducer } from "./reducers/tableDisplayReducer";
import { TableDisplayActionTypes } from "./enums/TableDisplayActionTypes";
import { TableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { TableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { ITableDisplayState } from "./interfaces/ITableDisplayState";

export interface ITableDisplayProviderProps {
  maxLevel: number;
}

const initialState: ITableDisplayState = {
  hiddenPaths: [],
  shownPaths: [],
  maxLevel: 0,
  currentPath: []
};

/**
 * Provides the required contexts to the InnerTableDisplay
 * @see InnerTableDisplay
 */
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
