"use client";
import { useParams } from "next/navigation";
import { getCoinById } from "../api/coinsApi";
import PriceHistoryChart from "./PriceHistoryChart";
import { useEffect, useState } from "react";
import { CryptoDetails } from "../types/crypto.types";
import { formatter } from "@/shared/utilities/formatCurrency";

export default function CryptoDetailsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cryptoData, setCryptoData] = useState<CryptoDetails | null>(null);
    const [priceHistory, setPriceHistory] = useState<{ date: string, price: number }[]>([]);
    const { ticker } = useParams();
    const tickerStr = Array.isArray(ticker ) ? ticker[0] : ticker; // ensure ticker is a string for ts type safety

    useEffect(() => {
        if (!tickerStr) {
            setError("No ticker provided");
            setLoading(false);
            return;
        }
        setLoading(true);
        getCoinById(tickerStr)
            .then((data) => {
                setCryptoData(data);
                setPriceHistory(data.priceHistory || []);
                setLoading(false);
                console.log("Called GET /api/coins/" + tickerStr);
                console.log(`Used cache or Called GET coingecko/api/v3/coins/${data.id}/market_chart?vs_currency=usd&days=30`)
            })
            .catch(() => {
                setError("Failed to load coin data");
                setLoading(false);
            });
    }, [tickerStr]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!cryptoData) return <p>No data found</p>;

    return (
        <>
            <h1 className="text-4xl text-center font-bold mb-4">Crypto Details for: {cryptoData?.ticker}</h1>
            <div className="text-center p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{cryptoData.name} ({cryptoData.ticker})</h2>
                <p className="mb-2">{cryptoData.description}</p>
                <p className="mb-2">Price: ${formatter.format(cryptoData.price)}</p>
                <p className="mb-2">Market Cap: ${formatter.format(cryptoData.marketCap)}</p>
                <p className="mb-2">24h Volume: ${formatter.format(cryptoData.volume24h)}</p>
                <p className="mb-2">24h Change: {cryptoData.change24h}%</p>
                <PriceHistoryChart priceHistory={priceHistory} />
            </div>
        </>
    )
}