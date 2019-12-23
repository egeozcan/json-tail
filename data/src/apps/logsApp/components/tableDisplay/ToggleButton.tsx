import * as React from "react";
import { FunctionComponent, useCallback, useMemo } from "react";
import { useTableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { showSubTree } from "./actionCreators/showSubTree";
import { collapseSubTree } from "./actionCreators/collapseSubTree";
import { ButtonWrapper } from "../common/buttons/ButtonWrapper";
import { BackgroundType, Block, CursorType, Size } from "../common/Block";

export interface IToggleButtonProps {
  path: string[];
  action: (path: string[]) => void;
  buttonType: ToggleButtonType;
}

export enum ToggleButtonType {
  Minimize,
  Maximize
}

export const ToggleButton: FunctionComponent<IToggleButtonProps> = ({
  path,
  action,
  buttonType
}) => {
  return (
    <Block
      background={BackgroundType.Dark}
      cursor={CursorType.Pointer}
      selectable={false}
      size={Size.Contract}
      onClick={() => action(path)}
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

export const ConnectedToggleButton: FunctionComponent<IConnectedToggleButtonProps> = ({
  buttonType,
  path
}) => {
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
