import { IShowAction } from "../interfaces/ITableDisplayAction";
import { TableDisplayActionTypes } from "../enums/TableDisplayActionTypes";

export function showSubTree(path: string[]): IShowAction {
  return {
    type: TableDisplayActionTypes.ShowPath,
    data: {
      path
    }
  };
}
