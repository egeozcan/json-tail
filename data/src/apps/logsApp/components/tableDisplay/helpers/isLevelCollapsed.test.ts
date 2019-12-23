import { isLevelCollapsed } from "./isLevelCollapsed";

test("level should be collapsed if hidden", () => {
  const actual = isLevelCollapsed(
    10,
    ["one", "two", "three"],
    [],
    [["one", "two", "three"]]
  );
  expect(actual).toBe(true);
});

test("level should not be collapsed if not hidden", () => {
  const actual = isLevelCollapsed(
    10,
    ["one", "two"],
    [],
    [["one", "two", "three"]]
  );
  expect(actual).toBe(false);
});

test("level should not be collapsed if shown explicitly even above max level", () => {
  const actual = isLevelCollapsed(1, ["one", "two"], [["one", "two"]], []);
  expect(actual).toBe(false);
});

test("level should be collapsed if above max level", () => {
  const actual = isLevelCollapsed(1, ["one", "two"], [["one"]], []);
  expect(actual).toBe(true);
});
