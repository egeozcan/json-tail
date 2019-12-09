import { IChangeStatusAction } from "../interfaces/IAppAction";
import { LogStatus } from "../components/log/enums/LogStatus";
import { ILog } from "../components/log/interfaces/ILog";
import { AppActionTypes } from "../enums/AppActionTypes";

export function toggleLog(
  id: number,
  currentStatus: LogStatus
): IChangeStatusAction {
  return {
    type: AppActionTypes.ChangeStatus,
    data: {
      logId: id || +new Date(),
      status:
        currentStatus === LogStatus.Shown
          ? LogStatus.Minimized
          : LogStatus.Shown
    }
  };
}
