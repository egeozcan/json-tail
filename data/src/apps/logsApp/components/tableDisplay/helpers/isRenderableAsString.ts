export function isRenderableAsString(obj: any) {
  if (Array.isArray(obj)) {
    return false;
  }

  if (["string", "number", "undefined", "boolean"].includes(typeof obj)) {
    return true;
  }

  return (
    obj === null || (typeof obj === "object" && Object.keys(obj).length === 0)
  );
}
