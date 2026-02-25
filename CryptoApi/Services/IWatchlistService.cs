using CryptoApi.Models;

namespace CryptoApi.Services;

public enum WatchlistAddResult
{
    Added,
    CoinNotFound,
    AlreadyExists
}

public enum WatchlistRemoveResult
{
    Removed,
    NotFound
}

public interface IWatchlistService
{
    Task<IReadOnlyList<Coin>> GetWatchlistAsync();
    Task<WatchlistAddResult> AddAsync(string ticker);
    Task<WatchlistRemoveResult> RemoveAsync(string ticker);
}