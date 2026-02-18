import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // bold for nav
  variable: "--font-montserrat",
});

export default function Navbar() {
    return (
        <nav className={`${montserrat.variable} py-8 px-4`}>
          <ul className="max-w-7xl mx-auto flex justify-between items-center">
            <li>
              <Link href="/" className="flex items-center gap-2 text-white text-xl font-bold tracking-wide hover:text-purple-300 transition-colors" style={{ fontFamily: "var(--font-montserrat)" }}>
                <img src="/favicon.ico" alt="Logo" className="w-12 h-12"/>
                Crypto Watchlist
              </Link>
            </li>
            <li>
              <Link href="/add-crypto-form" className="text-white hover:text-gray-300 font-semibold text-2xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                Add Crypto
              </Link>
            </li>
          </ul>
        </nav>
    )
};