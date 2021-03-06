import { AppAction, IAddAction } from "../interfaces/IAppAction";
import { LogStatus } from "../components/log/enums/LogStatus";
import { AppActionTypes } from "../enums/AppActionTypes";

export function createLog(
  data: unknown,
  status: LogStatus = LogStatus.Minimized,
  id: number | null = null,
  time: Date | null = null
): IAddAction {
  return {
    type: AppActionTypes.Add,
    data: {
      logId: id || +new Date(),
      logData: data,
      status: status,
      time: time || new Date()
    }
  };
}

export function createLogInternal(data: unknown) {
  return fetch("/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data })
  });
}
