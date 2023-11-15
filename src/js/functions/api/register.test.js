import register from "./register";

describe("register", () => {
  it("can register a user", async () => {
    const responseData = {
      id: 1,
      name: "my_username",
      email: "first.last@stud.noroff.no",
      banner: "",
      avatar: "https://img.service.com/avatar.jpg",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(responseData),
      }),
    );

    const formData = {
      name: "my_username", // Required
      email: "first.last@stud.noroff.no", // Required
      password: "UzI1NiIsInR5cCI", // Required
      avatar: "https://img.service.com/avatar.jpg", // Optional
    };
    const response = await register(formData);
    expect(response).toBe(responseData);
  });
});
