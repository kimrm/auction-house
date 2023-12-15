import login from "./login";

const responseData = {
  name: "my_username",
  email: "test@test.com",
  credits: "1000",
  avatar: "",
  accessToken: "123",
};
describe("login", () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(responseData),
  });
  it("stores a authenticated profile in local storage", async () => {
    const formData = {
      email: "test@test.com",
      password: "UzI1NiIsInR5cCI",
    };
    const response = await login(formData);
    expect(response).toBe(responseData);
  });
});
