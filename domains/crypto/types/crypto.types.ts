export interface CryptoCardProps {
  name: string; 
  ticker: string;
  price: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export interface CryptoDetails extends CryptoCardProps {
  description: string;
  marketCap: number;
  volume24h: number;
  change24h: number;
  priceHistory?: { date: string; price: number }[];
}

export interface PriceHistoryChartProps {
  priceHistory: { date: string; price: number }[];
}