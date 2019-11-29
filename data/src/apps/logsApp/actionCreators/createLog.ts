import { AppActionTypes, IAddAction } from "../interfaces/AppAction";
import { LogStatus } from "../components/log/enums/LogStatus";

export function createLog(data: unknown, id: number | null = null): IAddAction {
  return {
    type: AppActionTypes.Add,
    data: {
      logId: id || +new Date(),
      logData: data,
      status: LogStatus.Shown
    }
  };
}
