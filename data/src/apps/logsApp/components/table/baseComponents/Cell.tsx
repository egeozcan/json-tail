import * as React from "react";
import { FunctionComponent } from "react";
import { ICellProps } from "./ICellProps";
import { StyledTd } from "./StyledTd";

export const Cell: FunctionComponent<ICellProps> = props => (
  <StyledTd
    title={props.title}
    colSpan={props.colspan || 1}
    className={props.cssClass}
  >
    {props.children}
  </StyledTd>
);
