export interface CryptoCardProps {
  name: string; 
  ticker: string;
  price: number;
  change24h: number;
  image: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export interface CryptoDetails extends CryptoCardProps {
  description: string;  
  marketCap: number;
  volume24h: number;
  priceHistory?: { date: string; price: number }[];
}

export interface PriceHistoryChartProps {
  priceHistory: { date: string; price: number }[];
}

export interface MarketSummary {
  totalCoins: number;
  totalMarketCap: number;
  total24hVolume: number;
  avg24hChangePct: number;
  coins_up_24h: number;
  coins_down_24h: number;
  btcDominancePct: number;
  lastUpdated: string;
};