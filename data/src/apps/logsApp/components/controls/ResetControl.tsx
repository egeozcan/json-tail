import * as React from "react";
import { FunctionComponent } from "react";
import { resetLogs } from "../../actionCreators/resetLogs";
import { useLogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";

export interface IResetControlProps {
  onReset: () => void;
}

export const ResetControl: FunctionComponent<IResetControlProps> = ({
  onReset
}) => {
  return <input type={"button"} onClick={() => onReset()} value={"reset"} />;
};

export const ConnectedResetControl: FunctionComponent = () => {
  const dispatch = useLogsAppDispatchContext();

  return <ResetControl onReset={() => dispatch(resetLogs())} />;
};
