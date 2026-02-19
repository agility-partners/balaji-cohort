"use client";
import { useParams } from "next/navigation";
import { CryptoDetails } from "../types/crypto.types";
import { cryptosData } from "../mock/cryptos.mock";
import PriceHistoryChart from "./PriceHistoryChart";

export default function CryptoDetailsPage() {
    const { ticker } = useParams();
    const tickerStr = Array.isArray(ticker ) ? ticker[0] : ticker; // ensure ticker is a string for ts type safety

    if (!tickerStr) return <p>No ticker provided</p>;

    const cryptoData = cryptosData.find(
        (crypto: CryptoDetails) => crypto.ticker.toLowerCase() === tickerStr.toLowerCase()
    );

    const formatter = new Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2,
    });

    return (
        <>
            <h1 className="text-4xl text-center font-bold mb-4">Crypto Details for: {cryptoData?.ticker}</h1>
            {cryptoData ? (
                <div className="text-center p-6 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">{cryptoData.name} ({cryptoData.ticker})</h2>
                    <p className="mb-2">{cryptoData.description}</p>
                    <p className="mb-2">Price: ${formatter.format(cryptoData.price)}</p>
                    <p className="mb-2">Market Cap: ${formatter.format(cryptoData.marketCap)}</p>
                    <p className="mb-2">24h Volume: ${formatter.format(cryptoData.volume24h)}</p>
                    <p className="mb-2">24h Change: {cryptoData.change24h}%</p>
                    <PriceHistoryChart priceHistory={cryptoData.priceHistory ?? []} />

                </div>
            ) : (
                <p>Crypto not found</p>
            )}
        </>
    )
}