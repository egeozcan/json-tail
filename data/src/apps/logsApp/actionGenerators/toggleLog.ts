import { AppActionTypes, IChangeStatusAction } from "../AppAction";
import { LogStatus } from "../components/log/LogStatus";
import { ILog } from "../components/log/interfaces/ILog";

export function toggleStatus(id: number, log: ILog): IChangeStatusAction {
  return {
    type: AppActionTypes.ChangeStatus,
    data: {
      logId: id || +new Date(),
      status:
        log.status === LogStatus.Shown ? LogStatus.Minimized : LogStatus.Shown
    }
  };
}
