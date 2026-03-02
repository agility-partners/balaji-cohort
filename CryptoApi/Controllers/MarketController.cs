using Microsoft.AspNetCore.Mvc;

using CryptoApi.DTOs;
using CryptoApi.Services;

namespace CryptoApi.Controllers;

[ApiController]
[Route("api/market")]
public class MarketController : ControllerBase
{
    private readonly IMarketService _marketService;

    public MarketController(IMarketService marketService)
    {
        _marketService = marketService;
    }

    [HttpGet("summary")]
    public async Task<ActionResult<MarketSummaryDto>> GetMarketSummary()
    {
        var summary = await _marketService.GetMarketSummaryAsync();
        if (summary == null) return NotFound();
        return Ok(summary);
    }
}