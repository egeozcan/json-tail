import * as React from "react";
import { FunctionComponent, PropsWithChildren } from "react";
import { ICellProps } from "./ICellProps";
import { StyledTd } from "./styledComponents/StyledTd";

export const Cell: FunctionComponent<PropsWithChildren<ICellProps>> = (
  props
) => (
  <StyledTd
    title={props.title}
    colSpan={props.colspan || 1}
    className={props.cssClass}
  >
    {props.children}
  </StyledTd>
);
