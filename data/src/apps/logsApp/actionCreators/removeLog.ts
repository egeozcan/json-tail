import { AppAction } from "../interfaces/IAppAction";
import { AppActionTypes } from "../enums/AppActionTypes";
import { LogStatus } from "../components/log/enums/LogStatus";
import { sleep } from "../../lib/timing/sleep";

export function removeLog(
  id: number,
  dispatch: React.Dispatch<AppAction>,
  host: string
) {
  dispatch({
    type: AppActionTypes.ChangeStatus,
    data: {
      logId: id,
      status: LogStatus.Unloading,
    },
  });

  const deleteOnServer: Promise<Response | void> =
    host.length === 0
      ? Promise.resolve().then(() => sleep(1000))
      : fetch(`${host}delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

  deleteOnServer.then(() =>
    dispatch({
      type: AppActionTypes.Remove,
      data: {
        logId: id || +new Date(),
      },
    })
  );
}
