using CryptoApi.Models;

namespace CryptoApi.Services;

public interface ICoinService
{
    Task<IReadOnlyList<Coin>> GetAllAsync();
    Task<Coin?> GetByIdAsync(string ticker);
}