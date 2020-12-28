import * as React from "react";
import { ButtonWrapper } from "./ButtonWrapper";
import { deleteIcon } from "../icons/deleteIcon";

export interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: React.FunctionComponent<DeleteButtonProps> = ({
  onClick,
}) => <ButtonWrapper onClick={onClick}>{deleteIcon}</ButtonWrapper>;
