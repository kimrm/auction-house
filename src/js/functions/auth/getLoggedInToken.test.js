import getLoggedInToken from "./getLoggedInToken";

describe("getLoggedInToken", () => {
  it("can get a token", () => {
    const token = "123456789";
    global.localStorage = {
      getItem: jest.fn(() => token),
    };
    const response = getLoggedInToken();
    expect(response).toBe(token);
  });
});
