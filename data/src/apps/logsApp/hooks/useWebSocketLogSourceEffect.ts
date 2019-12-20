import { useEffect } from "react";
import { createLog } from "../actionCreators/createLog";
import { AppAction } from "../interfaces/IAppAction";
import { LogStatus } from "../components/log/enums/LogStatus";

export default function useWebSocketLogSourceEffect(
  logWebSocketSourceUrl: string,
  dispatch: React.Dispatch<AppAction>
) {
  useEffect(() => {
    const conn = new WebSocket(logWebSocketSourceUrl);
    let keepAlive = true;
    let aliveTimer: number | null = null;

    conn.onmessage = function(evt) {
      const messages = (<string>evt.data)
        .split("\n")
        .map(x => x.trim())
        .filter(x => x.length);

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

      if (aliveTimer !== null) {
        clearTimeout(aliveTimer);
      }
    };
  }, [dispatch, logWebSocketSourceUrl]);
}
