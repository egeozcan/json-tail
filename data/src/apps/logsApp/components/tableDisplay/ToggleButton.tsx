import {
  default as React,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
} from "react";
import { useTableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { showSubTree } from "./actionCreators/showSubTree";
import { collapseSubTree } from "./actionCreators/collapseSubTree";
import { BackgroundType, Block, CursorType, Size } from "../common/Block";

export interface IToggleButtonProps {
  path: string[];
  action: (path: string[]) => void;
  buttonType: ToggleButtonType;
}

export enum ToggleButtonType {
  Minimize,
  Maximize,
}

export const ToggleButton: FunctionComponent<
  PropsWithChildren<IToggleButtonProps>
> = ({ path, action, buttonType }) => {
  const onClick = useCallback(() => action(path), [action, path]);

  return (
    <Block
      background={BackgroundType.Dark}
      cursor={CursorType.Pointer}
      selectable={false}
      size={Size.Contract}
      onClick={onClick}
      noPadding={true}
      float={true}
    >
      [
      {buttonType === ToggleButtonType.Maximize
        ? "+"
        : buttonType === ToggleButtonType.Minimize
        ? "-"
        : "?"}
      ]
    </Block>
  );
};

export interface IConnectedToggleButtonProps
  extends Omit<IToggleButtonProps, "action"> {}

export const ConnectedToggleButton: FunctionComponent<
  PropsWithChildren<IConnectedToggleButtonProps>
> = ({ buttonType, path }) => {
  const dispatch = useTableDisplayDispatchContext();
  const action = useCallback(() => {
    if (buttonType === ToggleButtonType.Minimize) {
      dispatch(collapseSubTree(path));
    } else {
      dispatch(showSubTree(path));
    }
  }, [path, buttonType]);

  return <ToggleButton path={path} action={action} buttonType={buttonType} />;
};
