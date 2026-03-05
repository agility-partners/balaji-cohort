"use client";

import CryptoCard from "./CryptoCard";
import MarketSummaryPanel from "./MarketSummaryPanel";
import { CryptoDetails } from "../types/crypto.types";
import { getAllCoins } from "../api/coinsApi";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../api/watchlistApi";
import { useState, useEffect } from "react";

type WatchlistApiItem = string | { ticker?: string; coinId?: string };

export default function CryptoHomePage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [cryptosData, setCryptosData] = useState<CryptoDetails[]>([]);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [loadingWatchlist, setLoadingWatchlist] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCoins()
      .then((data) => {
        setCryptosData(data);
        setLoadingCoins(false);
      })
      .catch(() => {
        setError("Failed to load coins");
        setLoadingCoins(false);
      });

    getWatchlist()
      .then((data: WatchlistApiItem[]) => {
        const tickers = data
          .map((x) => (typeof x === "string" ? x : x.ticker ?? x.coinId ?? ""))
          .filter((t): t is string => t.length > 0)
          .map((t) => t.toUpperCase());

        setFavorites(tickers);
        setLoadingWatchlist(false);
      })
      .catch(() => {
        setError("Failed to load favorites");
        setLoadingWatchlist(false);
      });
  }, []);

  if (loadingCoins || loadingWatchlist) {
    return <div className="text-center text-purple-300 text-xl mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-10">{error}</div>;
  }

  const filteredCryptos = cryptosData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.ticker.toLowerCase().includes(search.toLowerCase())
  );

  const displayedCryptos = showOnlyFavorites
    ? filteredCryptos.filter((crypto) => favorites.includes(crypto.ticker.toUpperCase()))
    : filteredCryptos;

  const toggleFavorite = async (ticker: string) => {
    const normalized = ticker.toUpperCase();

    if (favorites.includes(normalized)) {
      setFavorites((prev) => prev.filter((fav) => fav !== normalized));
      try {
        await removeFromWatchlist(normalized);
      } catch {
        setFavorites((prev) => [...prev, normalized]);
      }
    } else {
      setFavorites((prev) => [...prev, normalized]);
      try {
        await addToWatchlist(normalized);
      } catch {
        setFavorites((prev) => prev.filter((fav) => fav !== normalized));
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-purple-300/30 bg-black/20 backdrop-blur-md shadow-[0_0_0_1px_rgba(196,181,253,0.12),0_20px_60px_rgba(76,29,149,0.25)] p-5 sm:p-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-3 mt-0 text-purple-200 drop-shadow-lg">
          Crypto Watchlist
        </h1>
        <p className="text-center text-purple-100/80 text-sm sm:text-base mb-8">
          Track market movers, filter quickly, and manage your favorites.
        </p>

        <div className="w-full max-w-6xl mx-auto self-stretch">
          <div className="rounded-2xl bg-black/15 border border-white/10 p-3 sm:p-4 mb-6">
            <MarketSummaryPanel />
          </div>

          <div className="mb-8 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ticker..."
              className="w-full max-w-md px-4 py-3 rounded-xl bg-black/35 border border-white/35 text-white placeholder:text-purple-100/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300/80 focus:border-purple-200 transition"
            />

            <button
              className={`ml-auto px-4 py-2 rounded-xl font-semibold border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300/70 ${
                showOnlyFavorites
                  ? "bg-purple-700 text-white border-purple-700 hover:bg-purple-600"
                  : "bg-transparent text-purple-200 border-purple-300/70 hover:bg-purple-300/15"
              }`}
              onClick={() => setShowOnlyFavorites((prev) => !prev)}
              type="button"
            >
              {showOnlyFavorites ? "Show All" : "Show Favorites"}
            </button>
          </div>

          {displayedCryptos.length === 0 ? (
            <div className="w-full rounded-2xl border border-white/10 bg-black/20 p-10 text-center text-purple-100/80">
              No coins match your current filter.
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-start">
              {displayedCryptos.map((crypto) => (
                <CryptoCard
                  key={crypto.ticker}
                  name={crypto.name}
                  ticker={crypto.ticker}
                  image={crypto.image}
                  price={crypto.price}
                  change24h={crypto.change24h}
                  isFavorite={favorites.includes(crypto.ticker.toUpperCase())}
                  onToggleFavorite={() => toggleFavorite(crypto.ticker)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}