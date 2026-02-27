#!/bin/bash
set -e

mkdir -p /app/crypto_dbt/logs
touch /app/crypto_dbt/logs/dbt_silver.log

printenv > /etc/environment

# user crontab syntax: NO username column
cat <<'EOF' | crontab -
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
*/5 * * * * . /etc/environment; cd /app/crypto_dbt && /usr/local/bin/dbt run --select silver.stg_market_data --project-dir /app/crypto_dbt --profiles-dir /root/.dbt >> /app/crypto_dbt/logs/dbt_silver.log 2>&1
EOF

# optional: run once immediately so you can see output now
/usr/local/bin/dbt run --select silver.stg_market_data --project-dir /app/crypto_dbt --profiles-dir /root/.dbt >> /app/crypto_dbt/logs/dbt_silver.log 2>&1 || true

exec cron -f