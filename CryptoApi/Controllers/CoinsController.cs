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

    [HttpGet("{id}")]
    public async Task<ActionResult<CoinDto>> GetById(string id)
    {
        var coin = await _coinService.GetByIdAsync(id);
        if (coin is null) return NotFound();

        return Ok(MapToDto(coin));
    }

    private static CoinDto MapToDto(Coin coin) => new()
    {
        Id = coin.Id,
        Symbol = coin.Symbol,
        Name = coin.Name,
        Price = coin.Price,
        Change24h = coin.Change24h
    };
}