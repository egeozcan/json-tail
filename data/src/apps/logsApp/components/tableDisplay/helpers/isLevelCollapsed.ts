import { arraysAreSame } from "./arraysAreSame";
import { HiddenPath, ShownPath } from "../interfaces/ITableDisplayState";

/**
 * Given the maximum shown level, the current path in object, the shown paths and the explicitly hidden paths
 * returns if the result should be collapsed (not shown)
 */
export function isLevelCollapsed(
  maxLevel: number,
  path: string[],
  shownPaths: ShownPath[],
  hiddenPaths: HiddenPath[]
): boolean {
  return (
    (maxLevel !== 0 &&
      path.length >= maxLevel &&
      shownPaths.find(shownPath => arraysAreSame(path, shownPath))) ===
      undefined ||
    hiddenPaths.find(hiddenPath => arraysAreSame(path, hiddenPath)) !==
      undefined
  );
}
