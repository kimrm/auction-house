import listings from "./listings";

const listingsMockList = [
  {
    id: "1",
    title: "First listing",
    description: "First listing description",
    tags: [""],
    media: ["https://url.com/image.jpg"],
    created: "2020-01-01T00:00:00.000Z",
    updated: "2020-01-01T00:00:00.000Z",
    endsAt: "2020-01-01T00:00:00.000Z",
    _count: {
      bids: 0,
    },
  },
  {
    id: "1",
    title: "Second listing",
    description: "Second listing description",
    tags: [""],
    media: ["https://url.com/image.jpg"],
    created: "2020-01-01T00:00:00.000Z",
    updated: "2020-01-01T00:00:00.000Z",
    endsAt: "2020-01-01T00:00:00.000Z",
    _count: {
      bids: 0,
    },
  },
];

describe("listings", () => {
  it("gets listings", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(listingsMockList),
    });
    const response = await listings();
    expect(response).toBe(listingsMockList);
  });
});
