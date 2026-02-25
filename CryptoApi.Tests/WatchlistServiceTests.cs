using System.Net;
using System.Net.Http.Json;
using CryptoApi.Models;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using CryptoApi.DTOs;

namespace CryptoApi.Tests;

public class WatchlistApiTests : IClassFixture<WebApplicationFactory<Program>>, IAsyncLifetime
{
    private readonly HttpClient _client;

    public WatchlistApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    public async Task InitializeAsync()
    {
        await ClearWatchlistAsync();
    }

    public Task DisposeAsync() => Task.CompletedTask;

    private async Task ClearWatchlistAsync()
    {
        var response = await _client.GetAsync("/api/watchlist");
        response.EnsureSuccessStatusCode();

        var watchlist = await response.Content.ReadFromJsonAsync<List<CoinDto>>();

        foreach (var coin in watchlist)
        {
            await _client.DeleteAsync($"/api/watchlist/{coin.Ticker}");
        }
    }

    [Fact]
    public async Task GetWatchlist_ReturnsEmptyList_Initially()
    {
        var response = await _client.GetAsync("/api/watchlist");
        response.EnsureSuccessStatusCode();

        var watchlist = await response.Content.ReadFromJsonAsync<List<CoinDto>>();
        Assert.NotNull(watchlist);
        Assert.Empty(watchlist);
    }

    [Fact]
    public async Task AddToWatchlist_ThenGetWatchlist_ReturnsAddedCoin()
    {
        var addRequest = new AddWatchlistRequestDto { Ticker = "BTC" };
        var addResponse = await _client.PostAsJsonAsync("/api/watchlist", addRequest);
        addResponse.EnsureSuccessStatusCode();

        var getResponse = await _client.GetAsync("/api/watchlist");
        getResponse.EnsureSuccessStatusCode();

        var watchlist = await getResponse.Content.ReadFromJsonAsync<List<CoinDto>>();
        Assert.NotNull(watchlist);
        Assert.Single(watchlist);
        Assert.Equal("BTC", watchlist[0].Ticker);
    }

    [Fact]
    public async Task AddToWatchlist_ThenRemoveFromWatchlist_ReturnsEmptyList()
    {
        var addRequest = new AddWatchlistRequestDto { Ticker = "ETH" };
        var addResponse = await _client.PostAsJsonAsync("/api/watchlist", addRequest);
        addResponse.EnsureSuccessStatusCode();

        var removeResponse = await _client.DeleteAsync("/api/watchlist/ETH");
        Assert.Equal(HttpStatusCode.NoContent, removeResponse.StatusCode);

        var getResponse = await _client.GetAsync("/api/watchlist");
        getResponse.EnsureSuccessStatusCode();

        var watchlist = await getResponse.Content.ReadFromJsonAsync<List<CoinDto>>();
        Assert.NotNull(watchlist);
        Assert.Empty(watchlist);
    }
}