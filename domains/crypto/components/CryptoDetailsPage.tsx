"use client";
import { useParams } from "next/navigation";
import { getCoinById } from "../api/coinsApi";
import PriceHistoryChart from "./PriceHistoryChart";
import { useEffect, useState } from "react";
import { CryptoDetails } from "../types/crypto.types";

export default function CryptoDetailsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cryptoData, setCryptoData] = useState<CryptoDetails | null>(null);
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
                setLoading(false);
                console.log("Called GET /api/coins/" + tickerStr);
            })
            .catch(() => {
                setError("Failed to load coin data");
                setLoading(false);
            });
    }, [tickerStr]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!cryptoData) return <p>No data found</p>;

    const formatter = new Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2,
    });

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
                <PriceHistoryChart priceHistory={cryptoData.priceHistory ?? []} />
            </div>
        </>
    )
}