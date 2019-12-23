import { isObjectWithGivenKeys } from "./isObjectWithGivenKeys";

const testProperty = "foo";
const testProperty2 = "foo";

test("object with no reqs", () => {
  expect(isObjectWithGivenKeys({})).toBe(false);
  expect(isObjectWithGivenKeys({ testProperty })).toBe(true);
});

test("object with reqs", () => {
  expect(isObjectWithGivenKeys({ testProperty }, ["testProperty"])).toBe(true);

  expect(
    isObjectWithGivenKeys({ testProperty2, testProperty }, [
      "testProperty",
      "testProperty2"
    ])
  ).toBe(true);

  expect(
    isObjectWithGivenKeys({ testProperty2, testProperty }, [
      "testProperty",
      "testProperty3"
    ])
  ).toBe(false);

  expect(
    isObjectWithGivenKeys({ testProperty2, testProperty }, ["testProperty"])
  ).toBe(false);

  expect(
    isObjectWithGivenKeys({ testProperty2, testProperty }, [
      "testProperty2",
      "testProperty",
      "testProperty3"
    ])
  ).toBe(false);
});
