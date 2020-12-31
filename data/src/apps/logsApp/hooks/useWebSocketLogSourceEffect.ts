import { useEffect } from "react";
import { createLog } from "../actionCreators/createLog";
import { AppAction } from "../interfaces/IAppAction";
import { LogStatus } from "../components/log/enums/LogStatus";
import { AppActionTypes } from "../enums/AppActionTypes";

export default function useWebSocketLogSourceEffect(
  logWebSocketSourceUrl: string,
  dispatch: React.Dispatch<AppAction>
) {
  useEffect(() => {
    const conn = new WebSocket(logWebSocketSourceUrl);

    conn.onmessage = function (evt) {
      const messages = (<string>evt.data)
        .split("\n")
        .map((x) => x.trim())
        .filter((x) => x.length);

      for (let i = 0; i < messages.length; i++) {
        let log = messages[i];
        const parsedLog = JSON.parse(log);

        try {
          parsedLog.data = JSON.parse(parsedLog.data);
        } catch {
          //no-op. todo: try parsing as other formats perhaps?
        }

        dispatch(
          createLog(
            parsedLog.data,
            LogStatus.Minimized,
            parsedLog.id,
            parsedLog.time
          )
        );
      }
    };

    return () => {
      conn.close();
    };
  }, [dispatch, logWebSocketSourceUrl]);

  useEffect(() => {
    const conn = new WebSocket("ws://" + document.location.host + "/state");

    conn.onmessage = function (evt) {
      dispatch({
        type: AppActionTypes.SetFiles,
        data: {
          files: (JSON.parse(evt.data) as string[]).map((x: string) => ({
            path: x,
          })),
        },
      });
    };

    return () => {
      conn.close();
    };
  }, [dispatch, logWebSocketSourceUrl]);
}
