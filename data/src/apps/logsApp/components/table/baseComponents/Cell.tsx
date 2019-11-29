import * as React from "react";
import { FunctionComponent } from "react";
import { ICellProps } from "./interfaces/ICellProps";
import { StyledTd } from "./styledComponents/StyledTd";

export const Cell: FunctionComponent<ICellProps> = props => (
  <StyledTd
    title={props.title}
    colSpan={props.colspan || 1}
    className={props.cssClass}
  >
    {props.children}
  </StyledTd>
);
