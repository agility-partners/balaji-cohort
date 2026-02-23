const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/watchlist`;

export async function getWatchlist() {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Failed to fetch watchlist");
    return response.json();
}

export async function addToWatchlist(coinId: string) {
    const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ coinId })
    });
    if (!response.ok) throw new Error(`Failed to add ${coinId} to watchlist`);
    return response;
}

export async function removeFromWatchlist(coinId: string) {
    const response = await fetch(`${API_BASE}/${coinId}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error(`Failed to remove ${coinId} from watchlist`);
    return response;
}