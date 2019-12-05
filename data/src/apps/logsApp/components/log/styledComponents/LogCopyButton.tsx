import * as React from "react";
import styled from "styled-components";

const LogCopyButtonContainer = styled.div`
  margin-right: 5px;
  user-select: none;
  cursor: pointer;
  background: #eee;
  padding: 5px;
`;

const copyIconPath =
  "M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 " +
  "25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 " +
  "24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 " +
  "0 0 0-7.029-16.97z";

export interface LogCopyButtonProps {
  getCopyString: () => string;
}

export const LogCopyButton: React.FunctionComponent<LogCopyButtonProps> = ({
  getCopyString
}) => (
  <LogCopyButtonContainer
    onClick={() => navigator.clipboard.writeText(getCopyString())}
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={copyIconPath}></path>
    </svg>
  </LogCopyButtonContainer>
);