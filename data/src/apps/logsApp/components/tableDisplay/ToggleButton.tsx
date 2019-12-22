import * as React from "react";
import { FunctionComponent, useCallback, useMemo } from "react";
import { useTableDisplayDispatchContext } from "./hooks/useTableDisplayDispatchContext";
import { showSubTree } from "./actionCreators/showSubTree";
import { collapseSubTree } from "./actionCreators/collapseSubTree";
import { ButtonWrapper } from "../common/buttons/ButtonWrapper";

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
    <ButtonWrapper onClick={() => action(path)}>
      [
      {buttonType === ToggleButtonType.Maximize
        ? "+"
        : buttonType === ToggleButtonType.Minimize
        ? "-"
        : "?"}
      ]
    </ButtonWrapper>
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
