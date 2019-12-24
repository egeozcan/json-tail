import React, { FunctionComponent } from "react";
import { Block } from "../common/Block";
import { useTableDisplayStateContext } from "./hooks/useTableDisplayStateContext";

export interface ICurrentPathDisplayProps {
  path: string[];
}

export const CurrentPathDisplay: FunctionComponent<ICurrentPathDisplayProps> = ({
  path
}) => (path.length > 0 ? <Block>{path.join(".")}</Block> : null);

export const ConnectedPathDisplay: FunctionComponent = () => {
  const state = useTableDisplayStateContext();
  return <CurrentPathDisplay path={state.currentPath} />;
};
