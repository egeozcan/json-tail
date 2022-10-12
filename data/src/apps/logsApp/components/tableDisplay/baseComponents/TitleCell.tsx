import * as React from "react";
import { ICellProps } from "./ICellProps";
import { StyledTh } from "./styledComponents/StyledTh";
import { FunctionComponent, PropsWithChildren } from "react";

export const TitleCell: FunctionComponent<PropsWithChildren<ICellProps>> = (
  props
) => (
  <StyledTh
    title={props.title}
    colSpan={props.colspan || 1}
    className={props.cssClass}
  >
    {props.children}
  </StyledTh>
);
