import { AppActionTypes, IChangeStatusAction } from "../interfaces/AppAction";
import { LogStatus } from "../components/log/enums/LogStatus";
import { ILog } from "../components/log/interfaces/ILog";

export function toggleLogStatusActionCreator(
  id: number,
  log: ILog
): IChangeStatusAction {
  return {
    type: AppActionTypes.ChangeStatus,
    data: {
      logId: id || +new Date(),
      status:
        log.status === LogStatus.Shown ? LogStatus.Minimized : LogStatus.Shown
    }
  };
}
