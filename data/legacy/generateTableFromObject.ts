import { render } from "./createTable";
import { escapeHTML } from "./escapeHtml";

export function generateTableFromObject(
  obj,
  tableClasses: string[] = ["objectTable", "jsonTable"]
) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  table.classList.add(...tableClasses);
  table.appendChild(tbody);

  if (!obj) {
    return table;
  }

  Object.keys(obj).forEach(key => {
    const row = tbody.insertRow(-1);
    const header = document.createElement("th");
    const content = render(obj[key]);

    row.appendChild(header);
    header.innerHTML = escapeHTML(key);

    if (typeof content === "string") {
      const contentCell = row.insertCell();

      contentCell.innerHTML = escapeHTML(content);
    } else {
      row.classList.add("hasSubTable");
      content.classList.add("subTable");
      header.colSpan = 2;
      header.appendChild(content);
    }
  });

  return table;
}
