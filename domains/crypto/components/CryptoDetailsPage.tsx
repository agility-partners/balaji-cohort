"use client";

import { useParams } from "next/navigation";
import { getCoinById } from "../api/coinsApi";
import PriceHistoryChart from "./PriceHistoryChart";
import { useEffect, useMemo, useState } from "react";
import { CryptoDetails } from "../types/crypto.types";
import { formatter } from "@/shared/utilities/formatCurrency";

export default function CryptoDetailsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cryptoData, setCryptoData] = useState<CryptoDetails | null>(null);
    const [priceHistory, setPriceHistory] = useState<{ date: string; price: number }[]>([]);

    const { ticker } = useParams();
    const tickerStr = Array.isArray(ticker) ? ticker[0] : ticker;

    useEffect(() => {
        if (!tickerStr) {
            setError("No ticker provided.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        getCoinById(tickerStr)
            .then((data) => {
                setCryptoData(data);
                setPriceHistory(data.priceHistory || []);
            })
            .catch(() => {
                setError("Failed to load coin data.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [tickerStr]);

    const changeClass = useMemo(() => {
        if (!cryptoData) return "text-slate-300";
        return cryptoData.change24h >= 0 ? "text-emerald-400" : "text-rose-400";
    }, [cryptoData]);

    if (loading) {
        return (
            <section className="relative min-h-[70vh] overflow-hidden rounded-2xl bg-slate-950 p-6 md:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.12),_transparent_35%)]" />
                <div className="relative animate-pulse space-y-6">
                    <div className="h-8 w-64 rounded bg-slate-800" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="h-28 rounded-xl bg-slate-800/80" />
                        <div className="h-28 rounded-xl bg-slate-800/80" />
                        <div className="h-28 rounded-xl bg-slate-800/80" />
                    </div>
                    <div className="h-80 rounded-2xl bg-slate-800/70" />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="mx-auto max-w-3xl rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6 text-center">
                <h2 className="mb-2 text-xl font-semibold text-rose-300">Request Failed</h2>
                <p className="text-rose-200/90">{error}</p>
            </section>
        );
    }

    if (!cryptoData) {
        return (
            <section className="mx-auto max-w-3xl rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-center text-slate-200">
                No data found.
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-slate-100 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.20),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.14),_transparent_35%)]" />

            <div className="relative mx-auto max-w-6xl space-y-6">
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-2 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                            Crypto Intelligence
                        </p>
                        <h1 className="text-3xl font-bold md:text-4xl">
                            {cryptoData.name}{" "}
                            <span className="text-cyan-300">({cryptoData.ticker})</span>
                        </h1>
                        <p className="mt-2 max-w-3xl text-slate-300">
                            {cryptoData.description}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 backdrop-blur">
                        <p className="text-xs uppercase tracking-wide text-slate-400">24h Change</p>
                        <p className={`text-2xl font-semibold ${changeClass}`}>
                            {cryptoData.change24h >= 0 ? "+" : ""}
                            {Number(cryptoData.change24h).toFixed(0)}%
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-5 backdrop-blur">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Price (USD)</p>
                        <p className="mt-2 text-2xl font-bold text-white">
                            {formatter.format(cryptoData.price)}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-5 backdrop-blur">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Market Cap</p>
                        <p className="mt-2 text-2xl font-bold text-white">
                            {formatter.format(cryptoData.marketCap)}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-5 backdrop-blur">
                        <p className="text-xs uppercase tracking-wide text-slate-400">24h Volume</p>
                        <p className="mt-2 text-2xl font-bold text-white">
                            {formatter.format(cryptoData.volume24h)}
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 md:p-6 backdrop-blur">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-100">30-Day Price History</h2>
                        <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-300">
                            USD
                        </span>
                    </div>
                    <PriceHistoryChart priceHistory={priceHistory} />
                </div>
            </div>
        </section>
    );
}