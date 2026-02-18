import Link from "next/link";
import { CryptoCardProps } from "../types/crypto.types";

export default function CryptoCard({ name, ticker, price }: CryptoCardProps) {
    return (
        <div className="w-64 rounded-lg bg-white p-4 shadow-md">
            <h2 className="text-xl text-black font-bold mb-2">{name} ({ticker})</h2>
            <p className="text-blue-600 mb-4">Current Price: ${price}</p>
            <Link href={`/${ticker.toLowerCase()}`}>
                <button className="w-full rounded bg-blue-500 text-white py-2 hover:bg-blue-600">
                    View Details
                </button>
            </Link>
        </div>
    )
}