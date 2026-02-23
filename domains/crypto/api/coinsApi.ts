const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/coins`;

export async function getAllCoins() {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Failed to fetch coins");
    return response.json();
}

export async function getCoinById(ticker: string) {
    const response = await fetch(`${API_BASE}/${ticker}`);
    if (!response.ok) throw new Error(`Failed to fetch ${ticker}`);
    return response.json();
}