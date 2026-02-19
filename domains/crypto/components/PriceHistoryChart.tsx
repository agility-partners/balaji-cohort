import { Line } from "react-chartjs-2";
import { PriceHistoryChartProps } from "../types/crypto.types";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function PriceHistoryChart({ priceHistory }: PriceHistoryChartProps) {
    if (!priceHistory || priceHistory.length === 0) return null;

    return (
        <div className="mt-8 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Price History (Mock)</h3>
            <div
                className="w-full max-w-xl"
                style={{ width: 800, height: 300, minWidth: 800 }}
            >
                <Line
                    data={{
                        labels: priceHistory.map((entry) => entry.date),
                        datasets: [
                            {
                                label: "Price (USD)",
                                data: priceHistory.map((entry) => entry.price),
                                fill: false,
                                borderColor: "#8b5cf6",
                                backgroundColor: "#a78bfa",
                                tension: 0.4,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                ticks: { color: "#a78bfa" },
                            },
                            x: {
                                ticks: { color: "#a78bfa" },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}