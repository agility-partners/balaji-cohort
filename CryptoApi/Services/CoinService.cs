using CryptoApi.Models;
using CryptoApi.DTOs;
using Microsoft.Data.SqlClient;

namespace CryptoApi.Services;

public class CoinService : ICoinService
{
    private readonly SqlConnectionStringBuilder _connStrBuilder;

    private static readonly Dictionary<string, (DateTime fetchedAt, List<PriceHistoryEntry> data)> _priceHistoryCache = new();
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(60);

    public CoinService(SqlConnectionStringBuilder connStrBuilder)
    {
        _connStrBuilder = connStrBuilder;
    }

    public async Task<IReadOnlyList<CoinDto>> GetAllAsync()
    {
        var coins = new List<CoinDto>();
        using var conn = new SqlConnection(_connStrBuilder.ConnectionString);
        using var cmd = new SqlCommand(@"
            SELECT coin_id, symbol, name, current_price, price_change_percentage_24h, market_cap
            FROM gold.coins_current", conn);

        await conn.OpenAsync();
        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            coins.Add(new CoinDto
            {
                Id = reader.GetString(0),
                Ticker = reader.GetString(1),
                Name = reader.GetString(2),
                Price = reader.GetDecimal(3),
                Change24h = reader.GetDecimal(4),
                MarketCap = reader.GetDecimal(5)
            });
        }
        return coins;
    }

    public async Task<CoinDto?> GetByIdAsync(string ticker)
    {
        using var conn = new SqlConnection(_connStrBuilder.ConnectionString);
        using var cmd = new SqlCommand(@"
            SELECT coin_id, symbol, name, current_price, price_change_percentage_24h, market_cap
            FROM gold.coins_current
            WHERE symbol = @ticker", conn);
            
        cmd.Parameters.AddWithValue("@ticker", ticker);

        await conn.OpenAsync();
        using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            var coinDto = new CoinDto
            {
                Id = reader.GetString(0),
                Ticker = reader.GetString(1),
                Name = reader.GetString(2),
                Price = reader.GetDecimal(3),
                Change24h = reader.GetDecimal(4),
                MarketCap = reader.GetDecimal(5)
            };

            // load and add price history
            try
            {
                var coinGeckoId = coinDto.Id;

                // check cache first
                if (_priceHistoryCache.TryGetValue(coinGeckoId, out var cacheEntry) &&
                (DateTime.UtcNow - cacheEntry.fetchedAt) < CacheDuration)
                {
                    coinDto.PriceHistory = cacheEntry.data;
                    Console.WriteLine($"Using cached CoinGecko price history for {coinGeckoId}");
                }
                else
                {
                    using var http = new HttpClient();
                    http.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (compatible; CryptoApi/1.0; +https://yourdomain.com)");
                    var url = $"https://api.coingecko.com/api/v3/coins/{coinGeckoId}/market_chart?vs_currency=usd&days=30";
                    Console.WriteLine($"Fetching CoinGecko price history: {url}");
                    var response = await http.GetFromJsonAsync<CoinGeckoMarketChartResponse>(url);

                    if (response?.prices != null)
                    {
                        // Aggregate to one data point per day (first price of each day)
                        var dailyPoints = response.prices
                            .Select(p => new {
                                Date = DateTimeOffset.FromUnixTimeMilliseconds((long)p[0]).UtcDateTime.Date,
                                Price = (decimal)p[1]
                            })
                            .GroupBy(x => x.Date)
                            .Select(g => new PriceHistoryEntry {
                                Date = g.First().Date.ToString("yyyy-MM-dd"),
                                Price = g.First().Price
                            })
                            .ToList();

                        coinDto.PriceHistory = dailyPoints;

                        _priceHistoryCache[coinGeckoId] = (DateTime.UtcNow, dailyPoints);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching price history: {ex}");
            }

            return coinDto;
        }
        return null;
    }
}

// Helper class for CoinGecko response
public class CoinGeckoMarketChartResponse
{
    public List<List<double>> prices { get; set; }
}