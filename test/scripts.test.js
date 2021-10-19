import {
  stringifyDate,
  stockPriceGenerator,
  socialMediaCountGenerator,
  recommendationAlgorithm,
} from "../methods";

test("convert String to Date", () => {
  const testResDate = new Date("2020-07-07T22:00:00.000Z");
  expect(stringifyDate(testResDate)).toBe("2020-07-07");
});

test("stock PriceGenerator", () => {
  const testResDate = new Date("2020-07-07T22:00:00.000Z");

  const result = stockPriceGenerator("ASX", testResDate);
  expect(result.price).toBeGreaterThanOrEqual(0);
  expect(result.price).toBeLessThanOrEqual(100);
  expect(result.stckDate).toBe("2020-07-07");
  expect(result.stockSymbol).toBe("ASX");
});

test("social MediaCountGenerator ", () => {
  const result = socialMediaCountGenerator("ASX", "Twitter");
  expect(result.count).toBeGreaterThanOrEqual(0);
  expect(result.count).toBeLessThanOrEqual(1000);
  expect(result.socialMediaType).toBe("Twitter");
  expect(result.stockSymbol).toBe("ASX");
});
test("recommendation Algorithm 1", () => {
  const testResDate = new Date("2020-07-07T22:00:00.000Z");
  const result = recommendationAlgorithm(
    { price: 53, stckDate: testResDate, stockSymbol: "NASA" },
    { socialMediaType: "Twitter", count: 632, stockSymbol: "NASA" },
    "Algo1"
  );
  expect(result.recommendation).toBe("hold");
  expect(result.stockPrice).toBe(53);
  expect(result.smCount).toBe(632);
});

test("recommendation Algorithm 2", () => {
  const testResDate = new Date("2020-07-07T22:00:00.000Z");
  const result = recommendationAlgorithm(
    { price: 83, stckDate: testResDate, stockSymbol: "NASA" },
    { socialMediaType: "Twitter", count: 400, stockSymbol: "NASA" },
    "Algo2"
  );
  expect(result.recommendation).toBe("hold");
  expect(result.stockPrice).toBe(83);
  expect(result.smCount).toBe(400);
});

test("recommendation Algorithm 3", () => {
  const testResDate = new Date("2020-07-07T22:00:00.000Z");
  const result = recommendationAlgorithm(
    { price: 13, stckDate: testResDate, stockSymbol: "NASA" },
    { socialMediaType: "Twitter", count: 900, stockSymbol: "NASA" },
    "Algo3"
  );
  expect(result.recommendation).toBe("buy");
  expect(result.stockPrice).toBe(13);
  expect(result.smCount).toBe(900);
});
