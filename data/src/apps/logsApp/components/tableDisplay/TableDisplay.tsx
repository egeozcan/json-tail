import * as React from "react";
import { FunctionComponent } from "react";
import { useImmerReducer } from "use-immer";
import { tableDisplayReducer } from "./reducers/tableDisplayReducer";
import { TableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { TableDisplayStateContext } from "./hooks/useTableDisplayStateContext";
import { ITableDisplayState } from "./interfaces/ITableDisplayState";
import { TableDisplayActionTypes } from "./enums/TableDisplayActionTypes";
import { InnerTableDisplay } from "./InnerTableDisplay";

const initialState: ITableDisplayState = {
  hiddenPaths: [],
  shownPaths: [],
  maxLevel: 0
};

interface ITableDisplayProviderProps {
  maxLevel: number;
}

/**
 * Provides the required contexts to the InnerTableDisplay
 * @see InnerTableDisplay
 */
const TableDisplayProvider: FunctionComponent<ITableDisplayProviderProps> = ({
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

export interface ITableDisplayProps extends ITableDisplayProviderProps {
  displayObject: unknown;
  path: string[];
}

/**
 * A component that takes an arbitrary JSON-compatible data structure and displays it as a table.
 * @param maxLevel The max level of depth the object will be displayed
 * @param displayObject The data to display. Confusingly this can also be a non-object.
 * @param path The starting path for label display. Helpful when rendering partial data.
 * @constructor
 */
export const TableDisplay: FunctionComponent<ITableDisplayProps> = ({
  maxLevel = 0,
  displayObject,
  path = []
}) => (
  <TableDisplayProvider maxLevel={maxLevel}>
    <InnerTableDisplay displayObject={displayObject} path={path} />
  </TableDisplayProvider>
);
