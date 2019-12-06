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
