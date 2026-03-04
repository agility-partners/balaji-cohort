import { MarketSummary } from "../types/crypto.types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getMarketSummary(): Promise<MarketSummary> {
  const response = await fetch(`${API_BASE}/api/market/summary`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load market summary");
  }

  const data = (await response.json()) as MarketSummary;

  return data;
}