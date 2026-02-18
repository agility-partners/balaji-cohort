import CryptoCard from "./components/CryptoCard";

export interface CryptoCardProps {
  name: string; 
  ticker: string;
  price: number;
}

export interface CryptoDetails extends CryptoCardProps {
    image: string;
    description: string;
    marketCap: number;
    volume24h: number;
    change24h: number;
}

export const cryptosData: CryptoDetails[] = [
  { 
    name: "Bitcoin",
    ticker: "BTC",
    price: 50000,
    image: "",
    description: "Bitcoin is a decentralized digital currency.",
    marketCap: 2000000000000,
    volume24h: 500000000000,
    change24h: 2.5 // percentage
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    price: 4000,
    image: "",
    description: "Ethereum is a decentralized platform that enables smart contracts and decentralized applications.",
    marketCap: 500000000000, 
    volume24h: 20000000000,
    change24h: 1.2
  },
  {
    name: "Cardano",
    ticker: "ADA",
    price: 2.5,
    image: "",
    description: "Cardano is a decentralized platform that enables complex programmable transfers of value.",
    marketCap: 40000000000, 
    volume24h: 1000000000,
    change24h: 0.5,
  },
  {
    name: "Solana",
    ticker: "SOL",
    price: 150,
    image: "",
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.",
    marketCap: 30000000000, 
    volume24h: 500000000,
    change24h: -0.8,
  }
]

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
