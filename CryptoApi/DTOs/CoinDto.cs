using System.Globalization;

namespace CryptoApi.DTOs;

public class PriceHistoryEntry
{
    public string Date { get; set; } = string.Empty;
    public decimal Price { get; set; }
}

public class CoinDto
{
    public string Ticker { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal MarketCap { get; set; }
    public decimal Volume24h { get; set; }
    public decimal Change24h { get; set; }
    public List<PriceHistoryEntry> PriceHistory { get; set; } = new List<PriceHistoryEntry>();
}