import Link from "next/link";
import { CryptoCardProps } from "../types/crypto.types";

export default function CryptoCard({ name, ticker, price, isFavorite = false, onToggleFavorite }: CryptoCardProps) {
    return (
        <div className="w-64 h-45 flex flex-col rounded-lg bg-white p-4 shadow-md relative">

            <button
                onClick={onToggleFavorite}
                className={`absolute top-2 right-2 text-xl ${isFavorite ? "text-red-400" : "text-gray-400"}`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                type="button"
            >
                {isFavorite ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="36" height="36">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="36" height="36">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                )}
            </button>

            <div className="flex-1">    
                <h2 className="text-xl text-black font-bold mb-2">{name} ({ticker})</h2>
                <p className="text-blue-600 mb-4">Current Price: ${price}</p>
            </div>

            <Link href={`/${ticker.toLowerCase()}`}>
                <button className="w-full rounded bg-blue-500 text-white py-2 hover:bg-blue-600 mt-auto">
                    View Details
                </button>
            </Link>
        </div>
    )
}