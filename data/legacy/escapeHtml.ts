export function escapeHTML(str) {
  if (str === " ") {
    return "&nbsp;";
  }

  if (str.indexOf("data:image") === 0) {
    return "<img src='" + str + "' />";
  }

  const text = document.createTextNode(str);
  const p = document.createElement("p");

  p.appendChild(text);
  return p.innerHTML;
}
