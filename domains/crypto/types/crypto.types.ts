export interface CryptoCardProps {
  name: string; 
  ticker: string;
  price: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export interface CryptoDetails extends CryptoCardProps {
  image: string;
  description: string;
  marketCap: number;
  volume24h: number;
  change24h: number;
}