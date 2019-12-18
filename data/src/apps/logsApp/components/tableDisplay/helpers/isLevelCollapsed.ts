import { arraysAreSame } from "./arraysAreSame";
import { HiddenPath, ShownPath } from "../interfaces/ITableDisplayState";

export function isLevelCollapsed(
  maxLevel: number,
  path: string[],
  shownPaths: ShownPath[],
  hiddenPaths: HiddenPath[]
) {
  return (
    (maxLevel !== 0 &&
      path.length >= maxLevel &&
      !shownPaths.find(shownPath => arraysAreSame(path, shownPath))) ||
    hiddenPaths.find(hiddenPath => arraysAreSame(path, hiddenPath))
  );
}
