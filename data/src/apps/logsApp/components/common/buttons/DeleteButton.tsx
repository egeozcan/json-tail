import { ButtonWrapper } from "./ButtonWrapper";
import { deleteIcon } from "../icons/deleteIcon";
import type { FunctionComponent, PropsWithChildren } from "react";

export interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: FunctionComponent<
  PropsWithChildren<DeleteButtonProps>
> = ({ onClick }) => (
  <ButtonWrapper onClick={onClick}>{deleteIcon}</ButtonWrapper>
);
