import { BackgroundType, CursorType, Block, Size } from "../Block";
import type { FunctionComponent, PropsWithChildren } from "react";

export interface IButtonWrapperProps {
  onClick: (...args: unknown[]) => unknown;
}

export const ButtonWrapper: FunctionComponent<
  PropsWithChildren<IButtonWrapperProps>
> = ({ children, onClick }) => (
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
