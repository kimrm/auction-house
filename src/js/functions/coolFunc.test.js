import coolFunc from "./coolFunc";

describe("coolFunc", () => {
  it("should add two numbers", () => {
    const result = coolFunc(1, 2);
    expect(result).toEqual(3);
  });
});
