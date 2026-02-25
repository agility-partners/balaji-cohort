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
        var result = await _watchlistService.AddAsync(request.Ticker);

        return result switch
        {
            WatchlistAddResult.CoinNotFound => NotFound(new { message = "Coin not found." }),
            WatchlistAddResult.AlreadyExists => Conflict(new { message = "Coin already in watchlist." }),
            WatchlistAddResult.Added => Created($"/api/watchlist/{request.Ticker}", null),
            _ => BadRequest(new { message = "An unexpected error occurred." })
        };
    }

    [HttpDelete("{ticker}")]
    public async Task<ActionResult> Remove(string ticker)
    {
        var result = await _watchlistService.RemoveAsync(ticker);
        return result == WatchlistRemoveResult.Removed ? NoContent() : NotFound();
    }

    private static CoinDto MapToDto(Coin coin) => new()
    {
        Ticker = coin.Ticker,
        Name = coin.Name,
        Price = coin.Price,
        Description = coin.Description,
        MarketCap = coin.MarketCap,
        Volume24h = coin.Volume24h,
        Change24h = coin.Change24h,
        PriceHistory = coin.PriceHistory.Select(ph => new PriceHistoryEntry
        {
            Date = ph.Date,
            Price = ph.Price
        }).ToList()
    };
}