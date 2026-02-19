import { CryptoDetails } from "../types/crypto.types";

export const cryptosData: CryptoDetails[] = [
  { 
    name: "Bitcoin",
    ticker: "BTC",
    price: 50000,
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
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.",
    marketCap: 30000000000, 
    volume24h: 500000000,
    change24h: -0.8,
    priceHistory: [
      { date: "2024-01-01", price: 120 },
      { date: "2024-02-01", price: 140 },
    ]
  },
  {
    name: "Polkadot",
    ticker: "DOT",
    price: 30,
    description: "Polkadot is a decentralized platform that enables cross-chain transfers of any type of data or asset.",
    marketCap: 25000000000, 
    volume24h: 800000000,
    change24h: 0.3,
    priceHistory: [
      { date: "2024-01-01", price: 28 },
      { date: "2024-02-01", price: 29 },
    ]
  },
  {
    name: "Avalanche",
    ticker: "AVAX",
    price: 60,
    description: "Avalanche is an open-source platform for launching decentralized applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem.",
    marketCap: 20000000000, 
    volume24h: 300000000,
    change24h: 0.7,
    priceHistory: [
      { date: "2024-01-01", price: 55 },
      { date: "2024-02-01", price: 58 },
    ]
  },
  {
    name: "Chainlink",
    ticker: "LINK",
    price: 25,
    description: "Chainlink is a decentralized oracle network that enables smart contracts to securely interact with real-world data and services outside of blockchain networks.",
    marketCap: 15000000000, 
    volume24h: 200000000,
    change24h: -0.4,
    priceHistory: [
      { date: "2024-01-01", price: 22 },
      { date: "2024-02-01", price: 24 },
    ]
  },
  {
    name: "Uniswap",
    ticker: "UNI",
    price: 20,
    description: "Uniswap is a decentralized exchange protocol built on Ethereum that allows users to swap ERC-20 tokens without relying on a centralized intermediary.",
    marketCap: 10000000000, 
    volume24h: 150000000,
    change24h: 0.1,
    priceHistory: [
      { date: "2024-01-01", price: 18 },
      { date: "2024-02-01", price: 19 },
    ]
  }
]