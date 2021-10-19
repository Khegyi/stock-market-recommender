import parseDate from "../scripts";

test("adds 1 + 2 to equal 3", () => {
  expect(parseDate("2020-07-08")).toBe(new Date(2020, 07, 08));
});
