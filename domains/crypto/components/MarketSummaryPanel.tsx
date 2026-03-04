"use client";

import { useEffect, useState } from "react";
import { getMarketSummary } from "../api/marketApi";
import { MarketSummary } from "../types/crypto.types";
import { numberFormatter, usdFormatter } from "@/shared/utilities/formatCurrency";
import { formatToEastern } from "@/shared/utilities/formatDateTime";

export default function MarketSummaryPanel() {
  const [marketSummary, setMarketSummary] = useState<MarketSummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    getMarketSummary()
      .then((data) => {
        setMarketSummary(data);
        setLoadingSummary(false);
      })
      .catch(() => {
        setSummaryError("Failed to load market summary");
        setLoadingSummary(false);
      });
  }, []);

  const avgPositive = (marketSummary?.avg24hChangePct ?? 0) >= 0;

  return (
    <section className="mb-8 rounded-2xl border border-purple-300/25 bg-black/35 p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-purple-100">Market Summary</h2>
        {marketSummary?.lastUpdated && (
          <span className="block text-2xl md:text-3xl font-bold text-purple-200/90">
            Updated: {formatToEastern(marketSummary.lastUpdated)}
          </span>
        )}
      </div>

      {loadingSummary ? (
        <div className="text-purple-200/80 text-sm">Loading market summary...</div>
      ) : summaryError ? (
        <div className="text-rose-300 text-sm">{summaryError}</div>
      ) : marketSummary ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-purple-300/20 bg-purple-500/10 p-3">
            <p className="text-xs text-purple-200/70">Total Coins</p>
            <p className="text-lg font-bold text-white">{numberFormatter.format(marketSummary.totalCoins)}</p>
          </div>

          <div className="rounded-xl border border-purple-300/20 bg-purple-500/10 p-3">
            <p className="text-xs text-purple-200/70">Total Market Cap</p>
            <p className="text-lg font-bold text-white">{usdFormatter.format(marketSummary.totalMarketCap)}</p>
          </div>

          <div className="rounded-xl border border-purple-300/20 bg-purple-500/10 p-3">
            <p className="text-xs text-purple-200/70">Total 24h Volume</p>
            <p className="text-lg font-bold text-white">{usdFormatter.format(marketSummary.total24hVolume)}</p>
          </div>

          <div className="rounded-xl border border-purple-300/20 bg-purple-500/10 p-3">
            <p className="text-xs text-purple-200/70">Avg 24h Change</p>
            <p className={`text-lg font-bold ${avgPositive ? "text-emerald-300" : "text-rose-300"}`}>
              {avgPositive ? "+" : ""}
              {marketSummary.avg24hChangePct.toFixed(2)}%
            </p>
          </div>

          <div className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 p-3">
            <p className="text-xs text-emerald-200/80">Coins Up (24h)</p>
            <p className="text-lg font-bold text-emerald-200">{numberFormatter.format(marketSummary.coins_up_24h)}</p>
          </div>

          <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 p-3">
            <p className="text-xs text-rose-200/80">Coins Down (24h)</p>
            <p className="text-lg font-bold text-rose-200">{numberFormatter.format(marketSummary.coins_down_24h)}</p>
          </div>

          <div className="rounded-xl border border-cyan-300/20 bg-cyan-500/10 p-3">
            <p className="text-xs text-cyan-200/80">BTC Dominance</p>
            <p className="text-lg font-bold text-cyan-200">{marketSummary.btcDominancePct.toFixed(2)}%</p>
          </div>

          <div className="rounded-xl border border-purple-300/20 bg-purple-500/10 p-3">
            <p className="text-xs text-purple-200/70">Last Updated (raw)</p>
            <p className="text-xs md:text-sm font-semibold text-white break-all">{marketSummary.lastUpdated}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}