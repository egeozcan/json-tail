/**
 *  Returns true if all positions for both arrays have the same value (or ref, for ref types)
 *  @param arrayFist first array to compare
 *  @param arraySecond second array to compare
 *  @param unsorted when true, arrays will be considered the "same" even with changed order
 */
export function arraysAreSame<T>(
  arrayFist: T[],
  arraySecond: T[],
  unsorted: boolean = false
): boolean {
  if (arrayFist.length !== arraySecond.length) {
    return false;
  }
  if (unsorted) {
    return arraysAreSameUnsorted(arrayFist, arraySecond);
  }
  for (let i = 0; i < arrayFist.length; i++) {
    if (arrayFist[i] !== arraySecond[i]) {
      return false;
    }
  }
  return true;
}

function arraysAreSameUnsorted<T>(arrayFist: T[], arraySecond: T[]): boolean {
  const keys = [...arraySecond.keys()];
  loop1: for (let i = 0; i < arrayFist.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (arrayFist[i] === arraySecond[keys[j]]) {
        keys.splice(j, 1);
        continue loop1;
      }
    }
    return false;
  }
  return true;
}
