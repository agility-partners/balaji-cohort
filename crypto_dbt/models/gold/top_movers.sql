{{ config(materialized='view') }}

WITH movers AS (
    SELECT
        coin_id,
        symbol,
        name,
        current_price,
        market_cap,
        price_change_percentage_24h,
        'gainer' AS category,
        ROW_NUMBER() OVER (ORDER BY price_change_percentage_24h DESC) as rank
    FROM {{ ref('coins_current') }}
    WHERE market_cap_rank <= 100
        AND price_change_percentage_24h > 0

    UNION ALL

    SELECT
        coin_id,
        symbol,
        name,
        current_price,
        market_cap,
        price_change_percentage_24h,
        'loser' AS category,
        ROW_NUMBER() OVER (ORDER BY price_change_percentage_24h ASC) as rank
    FROM {{ ref('coins_current') }}
    WHERE market_cap_rank <= 100
        AND price_change_percentage_24h < 0
)

SELECT *
FROM movers
WHERE (category = 'gainer' and rank <= 2)
    OR (category = 'loser' and rank <= 2)