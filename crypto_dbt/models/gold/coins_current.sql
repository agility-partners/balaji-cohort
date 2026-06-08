{{ config(materialized='table') }}

WITH latest_ingestion AS (
    SELECT MAX(ingested_at) AS max_ingested_at
    FROM {{ ref('stg_market_data') }}
),

latest_snapshot AS (
    SELECT s.*
    FROM {{ ref('stg_market_data') }} s
    INNER JOIN latest_ingestion li
        ON s.ingested_at = li.max_ingested_at
),

deduped_coin_rows AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY coin_id
            ORDER BY last_updated DESC, ingested_at DESC
        ) AS coin_row_num
    FROM latest_snapshot
),

latest_per_coin AS (
    SELECT
        coin_id,
        symbol,
        name,
        image,
        current_price,
        market_cap,
        market_cap_rank,
        last_updated,
        total_volume,
        price_change_percentage_24h
    FROM deduped_coin_rows
    WHERE coin_row_num = 1
),

ranked AS (
    SELECT
        coin_id,
        symbol,
        name,
        image,
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
        (market_cap * 1.0 / NULLIF(SUM(market_cap) OVER (), 0)) * 100 AS market_dominance_pct,
        ROW_NUMBER() OVER (
            ORDER BY market_cap_rank ASC, market_cap DESC, coin_id ASC
        ) AS display_rank
    FROM latest_per_coin
)

SELECT
    coin_id,
    symbol,
    name,
    image,
    current_price,
    market_cap,
    market_cap_rank,
    last_updated,
    total_volume,
    price_change_percentage_24h,
    price_trend,
    market_dominance_pct
FROM ranked
WHERE display_rank <= 25