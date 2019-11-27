import { generateTableFromObject } from "./generateTableFromObject";
import { generateTableFromArray } from "./generateTableFromArray";

export function render(data): HTMLElement | string {
  if (Array.isArray(data)) {
    return generateTableFromArray(data);
  }

  if (data instanceof Date) {
    return data.toLocaleDateString();
  }

  if (typeof data === "object" && data !== undefined) {
    return generateTableFromObject(data);
  }

  if (typeof data === "string") {
    return data;
  }

  return data !== null &&
    data !== undefined &&
    typeof data.toString === "function"
    ? data.toString()
    : " ";
}
