namespace CryptoApi.DTOs;

public class MarketSummaryDto
{
    public int TotalCoins { get; set; }
    public decimal TotalMarketCap { get; set; }
    public decimal Total24hVolume { get; set; }
    public decimal Avg24hChangePct { get; set; }
    public int coins_up_24h { get; set; }
    public int coins_down_24h { get; set; }
    public decimal BtcDominancePct { get; set; }
    public DateTime LastUpdated { get; set; }
}