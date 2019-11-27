import * as React from "react";
import { FunctionComponent } from "react";
import { StyledTable } from "./StyledTable";

export interface IBaseTableProps {
  baseTableCssClasses?: string;
}

export const BaseTable: FunctionComponent<IBaseTableProps> = props => (
  <StyledTable className={props.baseTableCssClasses + " objectTable jsonTable"}>
    <tbody>{props.children}</tbody>
  </StyledTable>
);
