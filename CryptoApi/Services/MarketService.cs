using Microsoft.Data.SqlClient;

using CryptoApi.DTOs;
using CryptoApi.Services;

namespace CryptoApi.Services;

public class MarketService : IMarketService
{
    private readonly SqlConnectionStringBuilder _connStrBuilder;
    
    public MarketService(SqlConnectionStringBuilder connStrBuilder)
    {
        _connStrBuilder = connStrBuilder;
    }

    public async Task<MarketSummaryDto?> GetMarketSummaryAsync()
    {
        using var conn = new SqlConnection(_connStrBuilder.ConnectionString);
        using var cmd = new SqlCommand(@"
            SELECT total_coins, total_market_cap, total_24h_volume, avg_24h_change_pct, coins_up_24h, coins_down_24h, btc_dominance_pct, last_updated
            FROM gold.market_summary", conn);

        await conn.OpenAsync();
        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            return new MarketSummaryDto
            {
                TotalCoins = reader.GetInt32(0),
                TotalMarketCap = reader.GetDecimal(1),
                Total24hVolume = reader.GetDecimal(2),
                Avg24hChangePct = reader.GetDecimal(3),
                coins_up_24h = reader.GetInt32(4),
                coins_down_24h = reader.GetInt32(5),
                BtcDominancePct = reader.GetDecimal(6),
                LastUpdated = reader.GetDateTime(7)
            };
        }
        return null;
    }
}