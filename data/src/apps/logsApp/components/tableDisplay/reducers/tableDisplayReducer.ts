import { ITableDisplayState } from "../interfaces/ITableDisplayState";
import { Draft } from "immer";
import { ITableDisplayAction } from "../interfaces/ITableDisplayAction";
import { TableDisplayActionTypes } from "../enums/TableDisplayActionTypes";
import { arraysAreSame } from "../helpers/arraysAreSame";

export function tableDisplayReducer(
  draft: Draft<ITableDisplayState>,
  action: ITableDisplayAction
): ITableDisplayState {
  const paths = draft.hiddenPaths;

  switch (action.type) {
    case TableDisplayActionTypes.HidePath:
      paths.push(action.data.path);
      return draft;

    case TableDisplayActionTypes.ShowPath:
      draft.hiddenPaths = paths.filter(
        path => !arraysAreSame(path, action.data.path)
      );
      return draft;
  }
}
