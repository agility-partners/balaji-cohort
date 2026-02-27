const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/watchlist`;

export async function getWatchlist() {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Failed to fetch watchlist");
    return response.json();
}

export async function addToWatchlist(ticker: string) {
    const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ticker })
    });
    if (!response.ok) throw new Error(`Failed to add ${ticker} to watchlist`);
    return response;
}

export async function removeFromWatchlist(ticker: string) {
    const response = await fetch(`${API_BASE}/${ticker}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error(`Failed to remove ${ticker} from watchlist`);
    return response;
}