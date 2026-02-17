import { useState } from "react";

export default function AddCryptoPage() {

    const [form, setForm] = useState({
        ticker: "",
    })

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-purple-700">
            
            <h1 className="text-3xl font-bold text-purple-200 mb-8">Add New Crypto</h1>

            <form className="bg-white p-6 rounded shadow-md flex flex-col gap-4 w-80">
                <input
                    name="ticker"
                    value={form.ticker}
                    onChange={(e) => setForm({ ticker: e.target.value })}
                    placeholder="Crypto Ticker (e.g. BTC)"
                    className="w-full p-2 border rounded"
                    required
                />
                <button className="bg-purple-700 text-white rounded p-2 font-bold hover:bg-purple-800">
                    Add Crypto to watchlist
                </button>
            </form>
        </div>
    )
}