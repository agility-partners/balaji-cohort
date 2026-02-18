import CryptoCard from "./CryptoCard";
import { cryptosData } from "../mock/cryptos.mock";

export default function Home() {
  return (
    <>
      <h1 className="text-7xl font-extrabold text-center mb-20 mt-0 text-purple-200 drop-shadow-lg">
        Crypto Watchlist
      </h1>

      <div className="flex flex-wrap gap-8 justify-center">
        {cryptosData.map((crypto) => (
          <CryptoCard 
            key={crypto.ticker}
            name={crypto.name}
            ticker={crypto.ticker}
            price={crypto.price}
          />
        ))}
      </div>
    </>
  );
}