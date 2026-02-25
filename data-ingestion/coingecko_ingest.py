import requests
import time
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
import pyodbc
from datetime import datetime, timezone
import os
import json

COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"

@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type(requests.exceptions.RequestException)
)
def fetch_coins():
    url = f"{COINGECKO_BASE_URL}/coins/markets"
    params = {
        'vs_currency': 'usd',
        'order': 'market_cap_desc',
        'per_page': 10,
        'page': 1,
        'sparkline': False
    }
    
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    return response.json()

def insert_raw_json_to_sql(raw_json):
    conn_str = (
        "DRIVER={ODBC Driver 18 for SQL Server};"
        f"SERVER={os.getenv('SQL_SERVER_HOST')},{os.getenv('SQL_SERVER_PORT')};"
        f"DATABASE=crypto_data;"
        f"UID={os.getenv('SQL_SERVER_USER')};"
        f"PWD={os.getenv('SQL_SERVER_PASS')};"
        "TrustServerCertificate=yes;"
    )
    
    try:
        with pyodbc.connect(conn_str) as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO bronze.raw_coin_data (ingested_at, raw_json) VALUES (?, ?)",
                    datetime.now(timezone.utc).replace(tzinfo=None),
                    json.dumps(raw_json)
                )
                conn.commit()
    except Exception as e:
        print(f"Error inserting data into SQL Server: {e}")
    
def main():
    try:
        data = fetch_coins()
        print("Fetched data:", data)
        insert_raw_json_to_sql(data)
    except Exception as e:
        print(f"Error fetching data: {e}")

if __name__ == "__main__":
    main()