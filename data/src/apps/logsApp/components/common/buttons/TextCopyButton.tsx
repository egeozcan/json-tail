import { ButtonWrapper } from "./ButtonWrapper";
import { copyIcon } from "../icons/copyIcon";
import type { FunctionComponent, PropsWithChildren } from "react";

export interface TextCopyButtonProps {
  getCopyString: () => string;
}

export const TextCopyButton: FunctionComponent<
  PropsWithChildren<TextCopyButtonProps>
> = ({ getCopyString }) => (
  <ButtonWrapper onClick={() => navigator.clipboard.writeText(getCopyString())}>
    {copyIcon}
  </ButtonWrapper>
);
