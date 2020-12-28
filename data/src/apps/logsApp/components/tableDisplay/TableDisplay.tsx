import { default as React, FunctionComponent } from "react";
import { InnerTableDisplay } from "./InnerTableDisplay";
import {
  ITableDisplayProviderProps,
  TableDisplayProvider,
} from "./TableDisplayProvider";
import { Block } from "../common/Block";
import { ConnectedPathDisplay } from "./CurrentPathDisplay";
import { RowContainer } from "../common/RowContainer";

export interface ITableDisplayProps extends ITableDisplayProviderProps {
  displayObject: unknown;
  path: string[];
}

/**
 * A component that takes an arbitrary JSON-compatible data structure and displays it as a table.
 * @param maxLevel The max level of depth the object will be displayed
 * @param displayObject The data to display. Confusingly this can also be a non-object.
 * @param path The starting path for label display. Helpful when rendering partial data.
 * @param showCurrentPath
 * @constructor
 */
export const TableDisplay: FunctionComponent<ITableDisplayProps> = ({
  maxLevel = 0,
  displayObject,
  path = [],
}) => (
  <TableDisplayProvider maxLevel={maxLevel}>
    <RowContainer vertical={true}>
      <ConnectedPathDisplay />
      <InnerTableDisplay displayObject={displayObject} path={path} />
    </RowContainer>
  </TableDisplayProvider>
);
