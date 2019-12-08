export function arraysAreSame<T>(arrayFist: T[], arraySecond: T[]) {
  if (arrayFist.length !== arraySecond.length) {
    return false;
  }
  for (let i = 0; i < arrayFist.length; i++) {
    if (arrayFist[i] !== arraySecond[i]) {
      return false;
    }
  }
}
