import * as React from "react";
import { FunctionComponent, useCallback } from "react";
import { useLogsAppDispatchContext } from "../../hooks/useLogsAppDispatchContext";
import { useLogsAppStateContext } from "../../hooks/useLogsAppStateContext";
import { changeLevel } from "../../actionCreators/changeLevel";

export interface IMaxLevelControlProps {
  onChangeLevel: (newLevel: number) => void;
  currentLevel: number;
}

export const MaxLevelControl: FunctionComponent<IMaxLevelControlProps> = ({
  onChangeLevel,
  currentLevel
}) => {
  return (
    <>
      <span>Max Level:</span>
      <select
        value={currentLevel}
        onChange={e => onChangeLevel(parseInt(e.target.value))}
      >
        {[...new Array(10).keys()].map(i => (
          <option value={i}>{i === 0 ? "All" : i}</option>
        ))}
      </select>
    </>
  );
};

export const ConnectedMaxLevelControl: FunctionComponent = () => {
  const state = useLogsAppStateContext();
  const dispatch = useLogsAppDispatchContext();
  const onChange = useCallback(
    (newLevel: number) => dispatch(changeLevel(newLevel)),
    [dispatch]
  );

  return (
    <MaxLevelControl currentLevel={state.maxLevel} onChangeLevel={onChange} />
  );
};
