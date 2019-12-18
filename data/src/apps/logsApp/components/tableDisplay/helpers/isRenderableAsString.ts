export function isRenderableAsString(obj: any) {
  return (
    ["string", "number", "undefined", "boolean"].includes(typeof obj) ||
    obj === null ||
    (typeof obj === "object" && Object.keys(obj).length === 0)
  );
}
