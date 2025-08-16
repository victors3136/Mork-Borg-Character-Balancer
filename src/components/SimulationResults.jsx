import {StatCard} from "./StatCard.jsx";
import React from "react";

export const SimulationResults = ({results}) => {
    if (!results) return null;

    return (
        <div className="mt-6 p-6 border backdrop-blur-sm">
            <h3 className="font-bold text-xl text-amber-300 mb-4 pb-2 border-b border-amber-400/20">
                Simulation Results
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    label="Simulations"
                    value={results.simulations.toLocaleString()}
                    color="text-amber-300"
                    bgColor="bg-amber-900/20"
                    icon="📊"
                />
                <StatCard
                    label="Total Win Rate"
                    value={`${results.totalWinRate}%`}
                    color="text-green-400"
                    bgColor="bg-green-900/20"
                    icon="🏆"
                    highlight={true}
                />
                <StatCard
                    label="Partial Win Rate"
                    value={`${results.partialWinRate}%`}
                    color="text-green-400"
                    bgColor="bg-green-900/20"
                    icon="🚩"
                />
                <StatCard
                    label="Loss Rate"
                    value={`${(100 - results.partialWinRate - results.totalWinRate - results.timeoutRate).toFixed(1)}%`}
                    color="text-red-400"
                    bgColor="bg-red-900/20"
                    icon="💀"
                />
                <StatCard
                    label="Avg. Rounds"
                    value={results.avgRounds}
                    color="text-blue-400"
                    bgColor="bg-blue-900/20"
                    icon="🔁"
                />
            </div>
        </div>
    );
};