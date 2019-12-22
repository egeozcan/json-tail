import * as React from "react";
import { BackgroundType, CursorType, Block, Size } from "../Block";

export interface IButtonWrapperProps {
  onClick: (...args: any[]) => any;
}

export const ButtonWrapper: React.FunctionComponent<IButtonWrapperProps> = ({
  children,
  onClick
}) => (
  <Block
    onClick={onClick}
    background={BackgroundType.Dark}
    cursor={CursorType.Pointer}
    selectable={false}
    size={Size.Contract}
  >
    {children}
  </Block>
);
