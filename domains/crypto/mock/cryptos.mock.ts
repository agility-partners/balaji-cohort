import { CryptoDetails } from "../types/crypto.types";

export const cryptosData: CryptoDetails[] = [
  { 
    name: "Bitcoin",
    ticker: "BTC",
    price: 50000,
    image: "",
    description: "Bitcoin is a decentralized digital currency.",
    marketCap: 2000000000000,
    volume24h: 500000000000,
    change24h: 2.5, // percentage
    priceHistory: [
      { date: "2024-01-01", price: 45000 },
      { date: "2024-02-01", price: 47000 },
    ]
  },
  {
    name: "Ethereum",
    ticker: "ETH",
    price: 4000,
    image: "",
    description: "Ethereum is a decentralized platform that enables smart contracts and decentralized applications.",
    marketCap: 500000000000, 
    volume24h: 20000000000,
    change24h: 1.2,
    priceHistory: [
      { date: "2024-01-01", price: 3800 },
      { date: "2024-02-01", price: 3900 },
    ]
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
    priceHistory: [
      { date: "2024-01-01", price: 2.0 },
      { date: "2024-02-01", price: 2.3 },
    ]
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
    priceHistory: [
      { date: "2024-01-01", price: 120 },
      { date: "2024-02-01", price: 140 },
    ]
  }
]