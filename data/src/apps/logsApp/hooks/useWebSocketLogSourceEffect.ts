import { useEffect } from "react";
import { createLog } from "../actionCreators/createLog";
import { AppAction } from "../interfaces/AppAction";

export default function useWebSocketLogSourceEffect(
  logWebSocketSourceUrl: string,
  dispatch: React.Dispatch<AppAction>
) {
  useEffect(() => {
    const conn = new WebSocket(logWebSocketSourceUrl);

    conn.onmessage = function(evt) {
      const messages = evt.data.split("\n");

      for (let i = 0; i < messages.length; i++) {
        let log = messages[i];

        try {
          log = JSON.parse(log);
        } catch (e) {
          //no-op
        }

        dispatch(createLog(log));
      }
    };

    return () => {
      conn.close();
    };
  }, [dispatch, logWebSocketSourceUrl]);
}
