using CryptoApi.DTOs;
using CryptoApi.Models;
using CryptoApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CryptoApi.Controllers;

[ApiController]
[Route("api/coins")]
public class CoinsController : ControllerBase
{
    private readonly ICoinService _coinService;

    public CoinsController(ICoinService coinService)
    {
        _coinService = coinService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CoinDto>>> GetAll()
    {
        var coins = await _coinService.GetAllAsync();
        return Ok(coins.Select(MapToDto));
    }

    [HttpGet("{ticker}")]
    public async Task<ActionResult<CoinDto>> GetById(string ticker)
    {
        var coin = await _coinService.GetByIdAsync(ticker);
        if (coin is null) return NotFound();

        return Ok(MapToDto(coin));
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