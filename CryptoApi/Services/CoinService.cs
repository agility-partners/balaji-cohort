using System.Data.Common;
using CryptoApi.Models;

namespace CryptoApi.Services;

public class CoinService : ICoinService
{
    private static readonly List<Coin> Coins =
    [
        new Coin { Id = "bitcoin", Symbol = "BTC", Name = "Bitcoin", Price = 50000m, Change24h = -2.5m },
        new Coin { Id = "ethereum", Symbol = "ETH", Name = "Ethereum", Price = 4000m, Change24h = 1.2m },
        new Coin { Id = "cardano", Symbol = "ADA", Name = "Cardano", Price = 2.5m, Change24h = 0.5m },
        new Coin { Id = "solana", Symbol = "SOL", Name = "Solana", Price = 150m, Change24h = -1.0m },
        new Coin { Id = "polkadot", Symbol = "DOT", Name = "Polkadot", Price = 30m, Change24h = 3.0m },
        new Coin { Id = "avalanche", Symbol = "AVAX", Name = "Avalanche", Price = 60m, Change24h = -0.8m },
        new Coin { Id = "chainlink", Symbol = "LINK", Name = "Chainlink", Price = 25m, Change24h = 2.0m },
        new Coin { Id = "uniswap", Symbol = "UNI", Name = "Uniswap", Price = 20m, Change24h = -1.5m } 
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