import { describe, expect, it } from "vitest";
import { TransactionWithOption, calculateOdds } from "@/lib/odds.utils";

describe("calculateOdds", () => {
  const allOptions = ["A", "B", "C", "D"];

  it("should calculate odds correctly for multiple options", () => {
    const transactions: TransactionWithOption[] = [
      { betOptionId: "A", coinsAmount: -100 },
      { betOptionId: "B", coinsAmount: -200 },
      { betOptionId: "A", coinsAmount: -50 },
    ];
    const result = calculateOdds(transactions, allOptions);
    expect(result.A).toBeCloseTo(2.33, 2);
    expect(result.B).toBeCloseTo(1.75, 2);
    expect(result.C).toBe(4);
    expect(result.D).toBe(4);
  });

  it("should handle single option correctly", () => {
    const transactions: TransactionWithOption[] = [
      { betOptionId: "A", coinsAmount: -100 },
      { betOptionId: "A", coinsAmount: -100 },
    ];
    const result = calculateOdds(transactions, allOptions);
    expect(result).toEqual({
      A: 1,
      B: 4,
      C: 4,
      D: 4,
    });
  });

  it("should return equal odds for empty transactions", () => {
    const result = calculateOdds([], allOptions);
    expect(result).toEqual({
      A: 4,
      B: 4,
      C: 4,
      D: 4,
    });
  });

  it("should handle large number of transactions", () => {
    const transactions: TransactionWithOption[] = Array(10000)
      .fill(null)
      .map(() => ({
        betOptionId: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
        coinsAmount: -Math.floor(Math.random() * 1000) - 1,
      }));
    const result = calculateOdds(transactions, allOptions);
    expect(Object.keys(result).length).toBe(4);
    Object.values(result).forEach((odd) => expect(odd).toBeGreaterThan(0));
  });

  it("should handle fractional coin amounts", () => {
    const transactions: TransactionWithOption[] = [
      { betOptionId: "A", coinsAmount: -100.5 },
      { betOptionId: "B", coinsAmount: -199.5 },
    ];
    const result = calculateOdds(transactions, allOptions);
    expect(result.A).toBeCloseTo(2.99, 2);
    expect(result.B).toBeCloseTo(1.5, 2);
    expect(result.C).toBe(4);
    expect(result.D).toBe(4);
  });

  it("should handle zero coin amounts", () => {
    const transactions: TransactionWithOption[] = [
      { betOptionId: "A", coinsAmount: 0 },
      { betOptionId: "B", coinsAmount: -100 },
    ];
    const result = calculateOdds(transactions, allOptions);
    expect(result.A).toBe(4);
    expect(result.B).toBe(1);
    expect(result.C).toBe(4);
    expect(result.D).toBe(4);
  });

  it("should handle absolute values of coin amounts", () => {
    const transactions: TransactionWithOption[] = [
      { betOptionId: "A", coinsAmount: 100 },
      { betOptionId: "B", coinsAmount: -100 },
    ];
    const result = calculateOdds(transactions, allOptions);
    expect(result.A).toBe(2);
    expect(result.B).toBe(2);
    expect(result.C).toBe(4);
    expect(result.D).toBe(4);
  });
});
