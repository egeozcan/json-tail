import * as React from "react";
import { ButtonWrapper } from "./ButtonWrapper";
import { deleteIcon } from "../icons/deleteIcon";
import { PropsWithChildren } from "react";

export interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: React.FunctionComponent<
  PropsWithChildren<DeleteButtonProps>
> = ({ onClick }) => (
  <ButtonWrapper onClick={onClick}>{deleteIcon}</ButtonWrapper>
);
