import type { FunctionComponent, PropsWithChildren } from "react";
import { StyledTable } from "./styledComponents/StyledTable";

export interface IBaseTableProps {
  baseTableCssClasses?: string;
}

export const BaseTable: FunctionComponent<
  PropsWithChildren<IBaseTableProps>
> = (props) => (
  <StyledTable className={props.baseTableCssClasses + " objectTable jsonTable"}>
    <tbody>{props.children}</tbody>
  </StyledTable>
);
