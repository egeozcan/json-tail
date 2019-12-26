import React, { FunctionComponent } from "react";
import { Block } from "../common/Block";
import { useTableDisplayStateContext } from "./hooks/useTableDisplayStateContext";

export interface ICurrentPathDisplayProps {
  path: string[];
}

export const CurrentPathDisplay: FunctionComponent<ICurrentPathDisplayProps> = ({
  path
}) => (
  <Block>
    {path.length > 0 ? path.join(".") : "Click on a value to show the path"}
  </Block>
);

export const ConnectedPathDisplay: FunctionComponent = () => {
  const state = useTableDisplayStateContext();
  return <CurrentPathDisplay path={state.currentPath} />;
};
