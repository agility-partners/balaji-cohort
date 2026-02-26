using CryptoApi.Models;
using CryptoApi.DTOs;
using Microsoft.Data.SqlClient;

namespace CryptoApi.Services;

public class CoinService : ICoinService
{
    private readonly SqlConnectionStringBuilder _connStrBuilder;

    public CoinService(SqlConnectionStringBuilder connStrBuilder)
    {
        _connStrBuilder = connStrBuilder;
    }

    public async Task<IReadOnlyList<CoinDto>> GetAllAsync()
    {
        var coins = new List<CoinDto>();
        using var conn = new SqlConnection(_connStrBuilder.ConnectionString);
        using var cmd = new SqlCommand(@"
            SELECT symbol, name, current_price, price_change_percentage_24h, market_cap
            FROM gold.coins_current", conn);

        await conn.OpenAsync();
        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            coins.Add(new CoinDto
            {
                Ticker = reader.GetString(0),
                Name = reader.GetString(1),
                Price = reader.GetDecimal(2),
                Change24h = reader.GetDecimal(3),
                MarketCap = reader.GetDecimal(4)
            });
        }
        return coins;
    }

    public async Task<CoinDto?> GetByIdAsync(string ticker)
    {
        using var conn = new SqlConnection(_connStrBuilder.ConnectionString);
        using var cmd = new SqlCommand(@"
            SELECT symbol, name, current_price, price_change_percentage_24h, market_cap
            FROM gold.coins_current
            WHERE symbol = @ticker", conn);
            
        cmd.Parameters.AddWithValue("@ticker", ticker);

        await conn.OpenAsync();
        using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new CoinDto
            {
                Ticker = reader.GetString(0),
                Name = reader.GetString(1),
                Price = reader.GetDecimal(2),
                Change24h = reader.GetDecimal(3),
                MarketCap = reader.GetDecimal(4)
            };
        }
        return null;
    }
}