import { ITableDisplayState } from "../interfaces/ITableDisplayState";
import { Draft } from "immer";
import { ITableDisplayAction } from "../interfaces/ITableDisplayAction";
import { TableDisplayActionTypes } from "../enums/TableDisplayActionTypes";
import { arraysAreSame } from "../helpers/arraysAreSame";

export function tableDisplayReducer(
  draft: Draft<ITableDisplayState>,
  action: ITableDisplayAction
): ITableDisplayState {
  switch (action.type) {
    case TableDisplayActionTypes.HidePath:
      for (const [i, path] of draft.shownPaths.entries()) {
        if (arraysAreSame(path, action.data.path)) {
          draft.shownPaths.splice(i, 1);
          break;
        }
      }
      draft.hiddenPaths.push(action.data.path);
      return draft;

    case TableDisplayActionTypes.ShowPath:
      for (const [i, path] of draft.hiddenPaths.entries()) {
        if (arraysAreSame(path, action.data.path)) {
          draft.hiddenPaths.splice(i, 1);
          break;
        }
      }
      draft.shownPaths.push(action.data.path);
      return draft;

    case TableDisplayActionTypes.SetMaxLevel:
      draft.maxLevel = action.data.level;
      return draft;

    case TableDisplayActionTypes.SetPath:
      draft.currentPath = action.data.path;
      return draft;
  }
}
