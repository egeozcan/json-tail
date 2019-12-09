import { IHideAction } from "../interfaces/ITableDisplayAction";
import { TableDisplayActionTypes } from "../enums/TableDisplayActionTypes";

export function collapseSubTree(path: string[]): IHideAction {
  return {
    type: TableDisplayActionTypes.HidePath,
    data: {
      path
    }
  };
}
