export function isRenderableAsString(obj: any) {
  if (typeof obj === "string" && obj.startsWith("data:image")) {
    return false;
  }

  return (
    ["string", "number", "undefined", "boolean"].includes(typeof obj) ||
    obj === null ||
    (typeof obj === "object" && Object.keys(obj).length === 0)
  );
}
