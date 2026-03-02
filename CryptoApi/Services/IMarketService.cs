using CryptoApi.DTOs;

namespace CryptoApi.Services;

public interface IMarketService
{
    Task<MarketSummaryDto?> GetMarketSummaryAsync();
}