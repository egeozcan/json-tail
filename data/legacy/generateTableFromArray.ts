import { isObjectWithGivenKeys } from "../src/apps/logsApp/components/table/helpers/isObjectWithGivenKeys";
import { escapeHTML } from "../src/apps/logsApp/components/table/helpers/escapeHtml";
import { render } from "./createTable";

export function generateTableFromArray(arr: any[]): HTMLTableElement {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  table.classList.add("arrayTable", "jsonTable");
  table.appendChild(tbody);

  if (arr.length === 0) {
    return table;
  }

  const firstRow = arr[0];
  const titles = Object.keys(firstRow);

  if (
    !isObjectWithGivenKeys(firstRow) ||
    arr.some(el => !isObjectWithGivenKeys(el, titles))
  ) {
    arr.forEach(el => {
      const row = tbody.insertRow();
      const contentCell = row.insertCell();
      const content = render(el);

      if (typeof content === "string") {
        contentCell.innerHTML = escapeHTML(content);
      } else {
        contentCell.appendChild(content);
      }
    });

    return table;
  }

  const titleRow = tbody.insertRow(-1);

  titles.forEach(title => {
    const header = document.createElement("th");

    header.innerHTML = escapeHTML(title);
    titleRow.appendChild(header);
  });

  arr.forEach((el, idx) => {
    const row = tbody.insertRow();
    const cellClass = idx % 2 === 0 ? "even" : "odd";

    titles.forEach(title => {
      const contentCell = row.insertCell();
      const content = render(el[title]);

      contentCell.classList.add(cellClass);

      if (typeof content === "string") {
        contentCell.innerHTML = escapeHTML(content);
      } else {
        contentCell.appendChild(content);
      }
    });
  });

  return table;
}
