"use client";
import CryptoCard from "./CryptoCard";
import { cryptosData } from "../mock/cryptos.mock";
import { useState } from "react";

export default function CryptoHomePage() {
  const [search, setSearch] = useState("");

  const filteredCryptos = cryptosData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.ticker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-7xl font-extrabold text-center mb-20 mt-0 text-purple-200 drop-shadow-lg">
        Crypto Watchlist
      </h1>

      <div className="w-full max-w-6xl mx-auto px-4 self-stretch">
        <div className="mb-8 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ticker..."
            className="w-full max-w-md px-4 py-3 rounded-xl bg-black/35 border border-white/50 text-white placeholder:text-purple-100/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-start">
          {filteredCryptos.map((crypto) => (
            <CryptoCard
              key={crypto.ticker}
              name={crypto.name}
              ticker={crypto.ticker}
              price={crypto.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}