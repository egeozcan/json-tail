import * as React from "react";
import { BackgroundType, CursorType, RowColumn } from "../RowColumn";

export interface IButtonWrapperProps {
  onClick: (...args: any[]) => any;
}

// language=LESS
export const StyledButtonWrapper: React.FunctionComponent<IButtonWrapperProps> = ({
  children,
  onClick
}) => (
  <RowColumn
    onClick={onClick}
    background={BackgroundType.Dark}
    cursor={CursorType.Pointer}
    selectable={false}
  >
    {children}
  </RowColumn>
);
