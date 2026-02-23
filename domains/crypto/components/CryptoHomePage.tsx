"use client";
import CryptoCard from "./CryptoCard";
import { CryptoDetails } from "../types/crypto.types";
import { getAllCoins } from "../api/coinsApi";
// import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../api/watchlistApi";

import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";


export default function CryptoHomePage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useLocalStorage<string[]>("cryptoFavorites", [], { initializeWithValue: false});
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  const [cryptosData, setCryptosData] = useState<CryptoDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCoins()
      .then(data => {
        setCryptosData(data);
        setLoading(false);
        console.log("Called GET /api/coins")
      })
      .catch(() => {
        setError("Failed to load coins");
        setLoading(false);
        console.log("Failed to call GET /api/coins");
      })
  }, []);

  if (loading) {
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
    ? filteredCryptos.filter((crypto) => favorites && favorites.includes(crypto.ticker))
    : filteredCryptos;

  const toggleFavorite = (ticker: string) => {
    setFavorites((prev) =>
      prev.includes(ticker)
        ? prev.filter((fav) => fav !== ticker) // filter out the ticker from favorites array if already in favorites since it was clicked on
        : [...prev, ticker]
    );
  }

  return (
    <>
      <h1 className="text-7xl font-extrabold text-center mb-20 mt-0 text-purple-200 drop-shadow-lg">
        Crypto Watchlist
      </h1>

      <div className="w-full max-w-6xl mx-auto px-4 self-stretch">
        <div className="mb-8 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search bar */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ticker..."
            className="w-full max-w-md px-4 py-3 rounded-xl bg-black/35 border border-white/50 text-white placeholder:text-purple-100/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          
          {/* Favorites toggle button */}
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

        {/* Crypto cards grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-start">
          {displayedCryptos.map((crypto) => (
            <CryptoCard
              key={crypto.ticker}
              name={crypto.name}
              ticker={crypto.ticker}
              price={crypto.price}
              isFavorite={favorites.includes(crypto.ticker)}
              onToggleFavorite={() => toggleFavorite(crypto.ticker)}
            />
          ))}
        </div>
      </div>
    </>
  );
}