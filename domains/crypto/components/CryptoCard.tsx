import Link from "next/link";
import Image from "next/image";

type CryptoCardProps = {
  name: string;
  ticker: string;
  price: number;
  image: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  change24h?: number;
};

const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

export default function CryptoCard({
  name,
  ticker,
  price,
  image,
  isFavorite = false,
  onToggleFavorite,
  change24h,
}: CryptoCardProps) {
  const isPositive = typeof change24h === "number" ? change24h >= 0 : null;

  return (
    <article className="group relative w-full overflow-hidden rounded-2xl border border-purple-300/20 bg-black/35 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/40 hover:shadow-[0_0_28px_rgba(217,70,239,0.22)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,_rgba(244,114,182,0.16),_transparent_45%)]" />

      <button
        onClick={onToggleFavorite}
        className={`absolute right-2 top-2 z-10 transition ${
          isFavorite ? "text-rose-400" : "text-purple-200/60 hover:text-rose-300"
        }`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        type="button"
      >
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="36" height="36">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="36" height="36">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        )}
      </button>

      <div className="relative pr-12">
        <div className="mb-3 flex items-start gap-3">
          <Image
            src={image}
            alt={`${name} logo`}
            width={34}
            height={34}
            className="rounded-full ring-1 ring-purple-200/30"
          />

          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-1 text-lg font-bold text-white">{name}</h2>
            <p className="text-xs uppercase tracking-[0.18em] text-purple-200/70">{ticker}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2.5">
            <p className="text-xl font-semibold leading-none text-white">{usdCompact.format(price)}</p>

            {typeof change24h === "number" && (
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none ${
                  isPositive
                    ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-200"
                    : "border-rose-300/30 bg-rose-400/15 text-rose-200"
                }`}
              >
                {isPositive ? "▲" : "▼"} {Math.abs(change24h).toFixed(0)}%
              </span>
            )}
          </div>

          <p className="mt-1 text-xs uppercase tracking-wide text-purple-200/60">USD</p>
        </div>
      </div>

      <Link
        href={`/${ticker.toLowerCase()}`}
        className="relative inline-flex w-full items-center justify-center rounded-xl border border-purple-300/30 bg-purple-500/20 px-4 py-2.5 text-sm font-semibold text-purple-50 transition hover:border-fuchsia-300/50 hover:bg-fuchsia-500/25"
      >
        View Details
      </Link>
    </article>
  );
}