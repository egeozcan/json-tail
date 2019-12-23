/**
 * For JS paths like ["obj", "prop", "list"] adds the array indicator with the given index to the last path
 * @example addArrayIndexToLastElement(["foo", "bar"], 3) would return ["foo", "bar[3]"]
 */
export function addArrayIndexToLastElement(
  arr: string[],
  idx: number
): string[] {
  const ret = ([] as string[]).concat(arr);
  const idxMark = `[${idx}]`;

  if (ret.length) {
    ret.splice(ret.length - 1, 1, ret[ret.length - 1] + idxMark);
  } else {
    ret.push(idxMark);
  }
  return ret;
}
