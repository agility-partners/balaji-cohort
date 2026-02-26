{{ config(
    materialized='incremental',
    unique_key=['coin_id', 'last_updated']
)}}

WITH exploded AS (
    SELECT
        VALUE AS coin_json,
        ingested_at
    FROM {{ source('bronze', 'raw_coin_data') }}
    CROSS APPLY OPENJSON(raw_json)
),

RAW AS (
    SELECT
        JSON_VALUE(coin_json, '$.id') AS coin_id,
        UPPER(JSON_VALUE(coin_json, '$.symbol')) AS symbol,
        JSON_VALUE(coin_json, '$.name') AS name,
        TRY_CAST(JSON_VALUE(coin_json, '$.current_price') AS decimal(18,8)) AS current_price,
        TRY_CAST(JSON_VALUE(coin_json, '$.market_cap') AS decimal(18,2)) AS market_cap,
        TRY_CAST(JSON_VALUE(coin_json, '$.total_volume') AS decimal(18,2)) AS total_volume,
        TRY_CAST(JSON_VALUE(coin_json, '$.market_cap_rank') AS int) AS market_cap_rank,
        TRY_CAST(JSON_VALUE(coin_json, '$.price_change_percentage_24h') AS decimal(18,4)) AS price_change_percentage_24h,
        TRY_CAST(JSON_VALUE(coin_json, '$.last_updated') AS datetime2) AS last_updated,
        ingested_at
    FROM exploded
),

filtered AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY coin_id, last_updated ORDER BY ingested_at DESC) AS rn
    FROM RAW
    WHERE coin_id IS NOT NULL
        AND current_price > 0
        AND market_cap_rank BETWEEN 1 AND 10000
        AND ABS(price_change_percentage_24h) < 1000
)

SELECT
    coin_id,
    symbol,
    name,
    current_price,
    market_cap,
    total_volume,
    market_cap_rank,
    price_change_percentage_24h,
    last_updated,
    ingested_at
FROM filtered
WHERE rn = 1