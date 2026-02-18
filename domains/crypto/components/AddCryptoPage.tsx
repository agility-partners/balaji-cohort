"use client";
import { useState } from "react";

export default function AddCryptoPage() {

    const [form, setForm] = useState({
        ticker: "",
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        alert(`Submitted: ${form.ticker}`);
        // mock
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-purple-200 mb-8">Add New Crypto</h1>
            <form className="bg-white p-6 rounded shadow-md flex flex-col gap-4 w-100" onSubmit={handleSubmit}>
                <input
                    name="ticker"
                    value={form.ticker}
                    onChange={(e) => setForm({ ticker: e.target.value })}
                    placeholder="Enter Crypto Ticker (e.g. BTC)"
                    className="w-full p-2 border-2 border-purple-800 rounded focus:border-purple-500 placeholder-purple-300 text-xl font-semibold text-black"
                    required
                />
                <button type="submit" className="bg-purple-700 text-white rounded p-2 font-bold hover:bg-purple-800">
                    Add crypto to watchlist
                </button>
            </form>
        </>
    )
}