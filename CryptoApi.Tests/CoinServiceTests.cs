using Xunit;
using Moq;
using CryptoApi.Services;
using CryptoApi.Models;
using System.Threading.Tasks;
using System.Reflection;

namespace CryptoApi.Tests;

public class CoinServiceTests
{
    [Fact]
    public async Task GetAllAsync_ReturnsListOfCoins()
    {
        var mockService = new Mock<ICoinService>();
        var expectedCoins = new List<Coin>
        {
            new Coin { Name = "Bitcoin", Ticker = "BTC" },
            new Coin { Name = "Ethereum", Ticker = "ETH" },
            new Coin { Name = "Cardano", Ticker = "ADA" },
            new Coin { Name = "Solana", Ticker = "SOL" },
            new Coin { Name = "Polkadot", Ticker = "DOT" },
            new Coin { Name = "Avalanche", Ticker = "AVAX" },
            new Coin { Name = "Chainlink", Ticker = "LINK" },
            new Coin { Name = "Uniswap", Ticker = "UNI" },
        };
        mockService.Setup(s => s.GetAllAsync()).ReturnsAsync(expectedCoins);

        var result = await mockService.Object.GetAllAsync();

        Assert.NotNull(result);
        Assert.Equal(expectedCoins.Count, result.Count);

        foreach (var coin in result)
        {
            Assert.NotNull(coin.Name);
            Assert.NotNull(coin.Ticker);

            Assert.Equal(expectedCoins.First(c => c.Ticker == coin.Ticker).Name, coin.Name);
        }
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsCoin_WhenCoinExists()
    {
        var mockService = new Mock<ICoinService>();
        var expectedCoin = new Coin { Name = "Bitcoin", Ticker = "BTC" };
        mockService.Setup(s => s.GetByIdAsync("BTC")).ReturnsAsync(expectedCoin);

        var result = await mockService.Object.GetByIdAsync("BTC");

        Assert.NotNull(result);
        Assert.Equal(expectedCoin.Name, result.Name);
        Assert.Equal(expectedCoin.Ticker, result.Ticker);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsNull_WhenCoinDoesNotExist()
    {
        var mockService = new Mock<ICoinService>();
        mockService.Setup(s => s.GetByIdAsync("NONEXISTENT")).ReturnsAsync((Coin)null);

        var result = await mockService.Object.GetByIdAsync("NONEXISTENT");

        Assert.Null(result);
    }

    [Fact]
    public async Task GetByIdAsync_IsCaseInsensitive()
    {
        var mockService = new Mock<ICoinService>();
        var expectedCoin = new Coin { Name = "Bitcoin", Ticker = "BTC" };
        mockService.Setup(s => s.GetByIdAsync(It.Is<string>(s => s.Equals("BTC", StringComparison.OrdinalIgnoreCase)))).ReturnsAsync(expectedCoin);

        var resultLower = await mockService.Object.GetByIdAsync("btc");
        var resultUpper = await mockService.Object.GetByIdAsync("BTC");
        var resultMixed = await mockService.Object.GetByIdAsync("BtC");

        Assert.NotNull(resultLower);
        Assert.NotNull(resultUpper);
        Assert.NotNull(resultMixed);

        Assert.Equal(expectedCoin.Name, resultLower.Name);
        Assert.Equal(expectedCoin.Ticker, resultLower.Ticker);

        Assert.Equal(expectedCoin.Name, resultUpper.Name);
        Assert.Equal(expectedCoin.Ticker, resultUpper.Ticker);

        Assert.Equal(expectedCoin.Name, resultMixed.Name);
        Assert.Equal(expectedCoin.Ticker, resultMixed.Ticker);
    }
}