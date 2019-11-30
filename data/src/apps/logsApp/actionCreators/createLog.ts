import { IAddAction } from "../interfaces/IAppAction";
import { LogStatus } from "../components/log/enums/LogStatus";
import { AppActionTypes } from "../enums/AppActionTypes";

export function createLog(
  data: unknown,
  status: LogStatus = LogStatus.Minimized,
  id: number | null = null
): IAddAction {
  return {
    type: AppActionTypes.Add,
    data: {
      logId: id || +new Date(),
      logData: data,
      status: status
    }
  };
}
