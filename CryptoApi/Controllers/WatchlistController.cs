using CryptoApi.DTOs;
using CryptoApi.Models;
using CryptoApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CryptoApi.Controllers;

[ApiController]
[Route("api/watchlist")]
public class WatchlistController : ControllerBase
{
    private readonly IWatchlistService _watchlistService;

    public WatchlistController(IWatchlistService watchlistService)
    {
        _watchlistService = watchlistService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CoinDto>>> GetWatchlist()
    {
        var watchlist = await _watchlistService.GetWatchlistAsync();
        return Ok(watchlist.Select(MapToDto));
    }

    [HttpPost]
    public async Task<ActionResult> Add([FromBody] AddWatchlistRequestDto request)
    {
        var result = await _watchlistService.AddAsync(request.CoinId);

        return result switch
        {
            WatchlistAddResult.CoinNotFound => NotFound(new { message = "Coin not found." }),
            WatchlistAddResult.AlreadyExists => Conflict(new { message = "Coin already in watchlist." }),
            WatchlistAddResult.Added => Created($"/api/watchlist/{request.CoinId}", null),
            _ => BadRequest(new { message = "An unexpected error occurred." })
        };
    }

    [HttpDelete("{coinId}")]
    public async Task<ActionResult> Remove(string coinId)
    {
        var result = await _watchlistService.RemoveAsync(coinId);
        return result == WatchlistRemoveResult.Removed ? NoContent() : NotFound();
    }

    private static CoinDto MapToDto(Coin coin) => new()
    {
        Id = coin.Id,
        Ticker = coin.Ticker,
        Name = coin.Name,
        Price = coin.Price,
        Change24h = coin.Change24h
    };
}