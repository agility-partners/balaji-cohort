using CryptoApi.Models;
using CryptoApi.DTOs;

namespace CryptoApi.Services;

public class CoinService : ICoinService
{
    private static List<PriceHistoryEntry> GeneratePriceHistory(decimal[] prices)
    {
        var history = new List<PriceHistoryEntry>();
        for (int i = 0; i < prices.Length; i++)
        {
            history.Add(new PriceHistoryEntry
            {
                Date = DateTime.UtcNow.AddDays(-(prices.Length - i)).ToString("yyyy-MM-dd"),
                Price = prices[i]
            });
        }
        return history;
    }

    private static readonly List<Coin> Coins =
    [
        new Coin { Id = "bitcoin", Ticker = "BTC", Name = "Bitcoin", Price = 50000m, Description = "Bitcoin is a decentralized digital currency that can be transferred on the peer-to-peer bitcoin network.", MarketCap = 900000000000m, Volume24h = 35000000000m, Change24h = 2.5m, PriceHistory = GeneratePriceHistory(new decimal[] { 48000m, 49000m, 47000m, 51000m, 49500m, 50500m, 50000m }) },
        new Coin { Id = "ethereum", Ticker = "ETH", Name = "Ethereum", Price = 4000m, Description = "Ethereum is a decentralized, open-source blockchain with smart contract functionality.", MarketCap = 400000000000m, Volume24h = 20000000000m, Change24h = -1.0m, PriceHistory = GeneratePriceHistory(new decimal[] { 3800m, 3900m, 3700m, 4100m, 3950m, 4050m, 4000m }) },
        new Coin { Id = "cardano", Ticker = "ADA", Name = "Cardano", Price = 2.5m, Description = "Cardano is a decentralized public blockchain and cryptocurrency project.", MarketCap = 80000000000m, Volume24h = 3000000000m, Change24h = 0.5m, PriceHistory = GeneratePriceHistory(new decimal[] { 2.3m, 2.4m, 2.2m, 2.6m, 2.45m, 2.55m, 2.5m }) },
        new Coin { Id = "solana", Ticker = "SOL", Name = "Solana", Price = 150m, Description = "Solana is a high-performance blockchain supporting builders around the world.", MarketCap = 45000000000m, Volume24h = 1500000000m, Change24h = -1.0m, PriceHistory = GeneratePriceHistory(new decimal[] { 140m, 145m, 135m, 155m, 150m, 152m, 150m }) },
        new Coin { Id = "polkadot", Ticker = "DOT", Name = "Polkadot", Price = 30m, Description = "Polkadot is a multi-chain network that enables interoperability between different blockchains.", MarketCap = 30000000000m, Volume24h = 1000000000m, Change24h = 3.0m, PriceHistory = GeneratePriceHistory(new decimal[] { 28m, 29m, 27m, 31m, 30m, 30.5m, 30m }) },
        new Coin { Id = "avalanche", Ticker = "AVAX", Name = "Avalanche", Price = 60m, Description = "Avalanche is an open-source platform for launching decentralized applications and enterprise blockchain deployments.", MarketCap = 12000000000m, Volume24h = 500000000m, Change24h = -0.8m, PriceHistory = GeneratePriceHistory(new decimal[] { 58m, 59m, 57m, 61m, 60m, 60.5m, 60m }) },
        new Coin { Id = "chainlink", Ticker = "LINK", Name = "Chainlink", Price = 25m, Description = "Chainlink is a decentralized oracle network that enables smart contracts to securely interact with real-world data and services.", MarketCap = 10000000000m, Volume24h = 400000000m, Change24h = 2.0m, PriceHistory = GeneratePriceHistory(new decimal[] { 24m, 24.5m, 23.5m, 25.5m, 25m, 25.2m, 25m }) },
        new Coin { Id = "uniswap", Ticker = "UNI", Name = "Uniswap", Price = 20m, Description = "Uniswap is a decentralized trading protocol, known for its role in facilitating automated trading of decentralized finance (DeFi) tokens.", MarketCap = 8000000000m, Volume24h = 300000000m, Change24h = -1.5m, PriceHistory = GeneratePriceHistory(new decimal[] { 19m, 19.5m, 18.5m, 20.5m, 20m, 20.2m, 20m }) }
    ];

    public Task<IReadOnlyList<Coin>> GetAllAsync()
    {
        return Task.FromResult((IReadOnlyList<Coin>)Coins); 
    }

    public Task<Coin?> GetByIdAsync(string id)
    {
        var coin = Coins.FirstOrDefault(c => c.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(coin);
    }
}