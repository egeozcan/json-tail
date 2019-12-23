import { arraysAreSame } from "./arraysAreSame";

test("arrays with same values should return true", () => {
  expect(arraysAreSame([1, 2, 3], [1, 2, 3])).toBe(true);
});

test("arrays with different values should return false", () => {
  expect(arraysAreSame([1, 2, 3, 4], [1, 2, 3])).toBe(false);
});

test("arrays with different ordered values should return false", () => {
  expect(arraysAreSame([1, 2, 3], [1, 3, 2])).toBe(false);
});

test("arrays with different ordered values should return true with third param", () => {
  expect(arraysAreSame([1, 2, 3], [1, 3, 2], true)).toBe(true);
});

test("string arrays with different ordered values should return true with third param", () => {
  expect(arraysAreSame(["1", "2", "3"], ["1", "3", "2"], true)).toBe(true);
});

test(
  "string arrays with different ordered values but with " +
    "unshared elements should return false with third param",
  () => {
    expect(
      arraysAreSame(["1", "2", "3", "4"], ["1", "3", "2", "3"], true)
    ).toBe(false);
  }
);
