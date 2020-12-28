import * as React from "react";
import styled from "styled-components";
import { ButtonWrapper } from "./ButtonWrapper";
import { downloadIcon } from "../icons/downloadIcon";
import { useCallback } from "react";

export interface LogDownloadButtonProps {
  getUrl: () => string;
}

export const DownloadButton: React.FunctionComponent<LogDownloadButtonProps> = ({
  getUrl,
}) => {
  const callback = useCallback(() => window.open(getUrl()), [getUrl]);

  return <ButtonWrapper onClick={callback}>{downloadIcon}</ButtonWrapper>;
};
