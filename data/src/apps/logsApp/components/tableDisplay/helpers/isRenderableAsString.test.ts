import { isRenderableAsString } from "./isRenderableAsString";

test("json value types and empty objects are renderable as string", () => {
  expect(isRenderableAsString(42)).toBe(true);
  expect(isRenderableAsString(true)).toBe(true);
  expect(isRenderableAsString("foo")).toBe(true);
  expect(isRenderableAsString(null)).toBe(true);
  expect(isRenderableAsString(undefined)).toBe(true);
  expect(isRenderableAsString({})).toBe(true);
});

test("other types are not renderable as string", () => {
  expect(isRenderableAsString({ foo: "bar" })).toBe(false);
  expect(isRenderableAsString([])).toBe(false);
  expect(isRenderableAsString(() => {})).toBe(false);
});
