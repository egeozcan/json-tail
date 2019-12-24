import { ISetPathAction } from "../interfaces/ITableDisplayAction";
import { TableDisplayActionTypes } from "../enums/TableDisplayActionTypes";

export function setCurrentPath(path: string[]): ISetPathAction {
  return {
    type: TableDisplayActionTypes.SetPath,
    data: {
      path
    }
  };
}
