{{ config(materialized='table') }}

SELECT
    coin_id,
    symbol,
    name,
    current_price,
    market_cap,
    market_cap_rank,
    last_updated,
    total_volume,
    price_change_percentage_24h,
    CASE 
        WHEN price_change_percentage_24h > 10 THEN 'strong_up'
        WHEN price_change_percentage_24h > 2 THEN 'up'
        WHEN price_change_percentage_24h BETWEEN -2 AND 2 THEN 'stable'
        WHEN price_change_percentage_24h < -10 THEN 'strong_down'
        ELSE 'down'
    END AS price_trend,
    (market_cap * 1.0 / SUM(market_cap) OVER ()) * 100 AS market_dominance_pct
FROM (
    SELECT
        *,
        ROW_NUMBER() OVER (PARTITION BY coin_id ORDER BY last_updated DESC) AS rn
    FROM {{ ref('stg_market_data') }}
) AS ranked
WHERE rn = 1