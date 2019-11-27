/**
 *  Determines if an object is derived from Object and has exactly the given keys
 */
export function isObjectWithGivenKeys(
  obj: any,
  mustHaveExactlyTheseKeys: string[] = []
) {
  if (
    !obj ||
    Array.isArray(obj) ||
    typeof obj !== "object" ||
    Object.keys(obj).length === 0
  ) {
    return false;
  }

  if (mustHaveExactlyTheseKeys.length === 0) {
    return true;
  }

  const ownKeys = Object.keys(obj);

  //todo: heavy optimization potential
  return (
    ownKeys.length === mustHaveExactlyTheseKeys.length &&
    ownKeys.every(key => mustHaveExactlyTheseKeys.indexOf(key) >= 0)
  );
}
