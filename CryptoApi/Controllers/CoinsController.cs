using CryptoApi.DTOs;
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
        return Ok(coins);
    }

    [HttpGet("{ticker}")]
    public async Task<ActionResult<CoinDto>> GetById(string ticker)
    {
        var coin = await _coinService.GetByIdAsync(ticker);
        if (coin is null) return NotFound();

        return Ok(coin);
    }
}