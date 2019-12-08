import { ITableDisplayState } from "../interfaces/ITableDisplayState";
import { Draft } from "immer";
import { ITableDisplayAction } from "../interfaces/ITableDisplayAction";
import { TableDisplayActionTypes } from "../enums/TableDisplayActionTypes";

export function TableDisplayReducer(
  draft: Draft<ITableDisplayState>,
  action: ITableDisplayAction
): ITableDisplayState {
  const paths = draft.hiddenPaths;
  switch (action.type) {
    case TableDisplayActionTypes.HidePath:
      paths.push(action.data.path);
      return draft;
    case TableDisplayActionTypes.ShowPath:
      draft.hiddenPaths = paths.filter(path => {
        if (path.length !== action.data.path.length) {
          return true;
        }
        for (const [i, pathPart] of path.entries()) {
          if (action.data.path[i] !== pathPart) {
            return true;
          }
        }
        return false;
      });
      return draft;
  }
}
