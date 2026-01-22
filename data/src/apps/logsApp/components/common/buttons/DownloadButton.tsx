import { ButtonWrapper } from "./ButtonWrapper";
import { downloadIcon } from "../icons/downloadIcon";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useCallback } from "react";

export interface LogDownloadButtonProps {
  getUrl: () => string;
}

export const DownloadButton: FunctionComponent<
  PropsWithChildren<LogDownloadButtonProps>
> = ({ getUrl }) => {
  const callback = useCallback(() => window.open(getUrl()), [getUrl]);

  return <ButtonWrapper onClick={callback}>{downloadIcon}</ButtonWrapper>;
};
