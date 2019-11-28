import { AppActionTypes, IAddAction } from "../AppAction";

export function createLog(data: any, id: number | null = null): IAddAction {
  return {
    type: AppActionTypes.Add,
    data: {
      logId: id || +new Date(),
      log: data
    }
  };
}
