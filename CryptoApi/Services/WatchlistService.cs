using System.Collections.Concurrent;
using CryptoApi.DTOs;

namespace CryptoApi.Services;

public class WatchlistService : IWatchlistService
{
    private readonly ICoinService _coinService;
    private readonly ConcurrentDictionary<string, byte> _watchlist = new(StringComparer.OrdinalIgnoreCase);

    public WatchlistService(ICoinService coinService)
    {
        _coinService = coinService;
    }

    public async Task<IReadOnlyList<CoinDto>> GetWatchlistAsync()
    {
        var result = new List<CoinDto>();

        foreach (var ticker in _watchlist.Keys)
        {
            var coin = await _coinService.GetByIdAsync(ticker);
            if (coin is not null) result.Add(coin);
        }

        return result;
    }

    public async Task<WatchlistAddResult> AddAsync(string ticker)
    {
        var coin = await _coinService.GetByIdAsync(ticker);
        if (coin is null) return WatchlistAddResult.CoinNotFound;

        var added = _watchlist.TryAdd(ticker, 0);
        return added ? WatchlistAddResult.Added : WatchlistAddResult.AlreadyExists;
    }

    public Task<WatchlistRemoveResult> RemoveAsync(string ticker)
    {
        var removed = _watchlist.TryRemove(ticker, out _);
        return Task.FromResult(removed ? WatchlistRemoveResult.Removed : WatchlistRemoveResult.NotFound);
    }
}