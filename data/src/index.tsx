import { createRoot } from "react-dom/client";
import { LogsApp } from "./apps/logsApp/LogsApp";

const container = document.getElementById("logApp");
if (container) {
  const root = createRoot(container);
  root.render(
    <LogsApp
      logWebSocketSourceUrl={"ws://" + document.location.host + "/tail"}
    />
  );
}
