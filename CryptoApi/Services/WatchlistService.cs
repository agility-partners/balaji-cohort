using System.Collections.Concurrent;
using CryptoApi.Models;

namespace CryptoApi.Services;

public class WatchlistService : IWatchlistService
{
    private readonly ICoinService _coinService;
    private readonly ConcurrentDictionary<string, byte> _watchlist = new(StringComparer.OrdinalIgnoreCase);

    public WatchlistService(ICoinService coinService)
    {
        _coinService = coinService;
    }

    public async Task<IReadOnlyList<Coin>> GetWatchlistAsync()
    {
        var result = new List<Coin>();

        foreach (var coinId in _watchlist.Keys)
        {
            var coin = await _coinService.GetByIdAsync(coinId);
            if (coin is not null) result.Add(coin);
        }

        return result;
    }

    public async Task<WatchlistAddResult> AddAsync(string coinId)
    {
        var coin = await _coinService.GetByIdAsync(coinId);
        if (coin is null) return WatchlistAddResult.CoinNotFound;

        var added = _watchlist.TryAdd(coinId, 0);
        return added ? WatchlistAddResult.Added : WatchlistAddResult.AlreadyExists;
    }

    public Task<WatchlistRemoveResult> RemoveAsync(string coinId)
    {
        var removed = _watchlist.TryRemove(coinId, out _);
        return Task.FromResult(removed ? WatchlistRemoveResult.Removed : WatchlistRemoveResult.NotFound);
    }
}