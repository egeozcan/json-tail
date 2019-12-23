import { addArrayIndexToLastElement } from "./addArrayIndexToLastElement";

test("add index to zero-array", () => {
  const res = addArrayIndexToLastElement([], 1);
  expect(res.join(",")).toBe("[1]");
});

test("add index to one-array", () => {
  const res = addArrayIndexToLastElement(["a"], 1);
  expect(res.join(",")).toBe("a[1]");
});
