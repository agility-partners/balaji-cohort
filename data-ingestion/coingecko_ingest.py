import requests
import time
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

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
    
def main():
    try:
        data = fetch_coins()
        print("Fetched data:", data)
    except Exception as e:
        print(f"Error fetching data: {e}")

if __name__ == "__main__":
    main()