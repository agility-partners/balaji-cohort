using CryptoApi.DTOs;

namespace CryptoApi.Services;

public interface ICoinService
{
    Task<IReadOnlyList<CoinDto>> GetAllAsync();
    Task<CoinDto?> GetByIdAsync(string ticker);
}