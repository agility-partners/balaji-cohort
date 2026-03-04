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
    <>
      <h1 className="text-6xl md:text-7xl font-extrabold text-center mb-8 mt-0 text-purple-200 drop-shadow-lg">
        Crypto Watchlist
      </h1>

      <div className="w-full max-w-6xl mx-auto px-4 self-stretch">
        <MarketSummaryPanel />

        <div className="mb-8 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ticker..."
            className="w-full max-w-md px-4 py-3 rounded-xl bg-black/35 border border-white/50 text-white placeholder:text-purple-100/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button
            className={`ml-auto px-4 py-2 rounded-xl font-semibold border transition ${
              showOnlyFavorites
                ? "bg-purple-700 text-white border-purple-700"
                : "bg-transparent text-purple-300 border-purple-300 hover:bg-purple-300/20"
            }`}
            onClick={() => setShowOnlyFavorites((prev) => !prev)}
            type="button"
          >
            {showOnlyFavorites ? "Show All" : "Show Favorites"}
          </button>
        </div>

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
      </div>
    </>
  );
}