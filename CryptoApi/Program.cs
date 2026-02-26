using CryptoApi.Services;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register GoldReadDb connection string
var goldReadDbConnStr = builder.Configuration.GetConnectionString("GoldReadDb");
var sqlPass = Environment.GetEnvironmentVariable("SQL_SERVER_PASS");
var connStrBuilder = new SqlConnectionStringBuilder(goldReadDbConnStr)
{
    Password = sqlPass
};
builder.Services.AddSingleton(connStrBuilder);

builder.Services.AddSingleton<ICoinService, CoinService>();
builder.Services.AddSingleton<IWatchlistService, WatchlistService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();

public partial class Program { }