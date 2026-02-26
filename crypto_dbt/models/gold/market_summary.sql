{{ config(materialized='view') }}

SELECT
    count(*) AS total_coins,
    SUM(market_cap) AS total_market_cap,
    SUM(total_volume) AS total_24h_volume,
    AVG(price_change_percentage_24h) AS avg_24h_change_pct,
    SUM(CASE WHEN price_change_percentage_24h > 0 THEN 1 ELSE 0 END) as coins_up_24h,
    SUM(CASE WHEN price_change_percentage_24h < 0 THEN 1 ELSE 0 END) as coins_down_24h,
    (SUM(CASE WHEN symbol = 'BTC' THEN market_cap ELSE 0 END) * 100.0 / NULLIF(SUM(market_cap), 0)) AS btc_dominance_pct
FROM {{ ref('coins_current') }}


