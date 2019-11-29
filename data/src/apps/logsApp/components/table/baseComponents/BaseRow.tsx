import * as React from "react";
import { FunctionComponent } from "react";
import { StyledTr } from "./styledComponents/StyledTr";
import { TitleCell } from "./TitleCell";
import { Cell } from "./Cell";

export enum HeaderType {
  None,
  Single,
  All
}

interface IRowProps {
  headerType?: HeaderType;
  colspan?: number;
  cssClass?: string;
  cellCssClass?: string;
  title?: string;
}

export const BaseRow: FunctionComponent<IRowProps> = props => {
  return (
    <StyledTr title={props.title} className={props.cssClass}>
      {React.Children.map(props.children, (child, i) => {
        const isHeader =
          props.headerType === HeaderType.All ||
          (props.headerType === HeaderType.Single && i === 0);

        const MyCell = isHeader ? TitleCell : Cell;

        return (
          <MyCell
            title={props.title}
            key={i}
            cssClass={props.cellCssClass}
            colspan={props.colspan}
          >
            {child}
          </MyCell>
        );
      })}
    </StyledTr>
  );
};
