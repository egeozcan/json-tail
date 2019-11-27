import * as React from "react";
import { FunctionComponent } from "react";
import { ICellProps } from "./ICellProps";
import { StyledTh } from "./StyledTh";

export const TitleCell: FunctionComponent<ICellProps> = props => (
  <StyledTh
    title={props.title}
    colSpan={props.colspan || 1}
    className={props.cssClass}
  >
    {props.children}
  </StyledTh>
);
