import React from "react";

export const StatCard = ({ label, value, color, bgColor, icon, highlight = false }) => <div className={`p-5 rounded-lg transition-all duration-300 hover:scale-[1.02] h-32 flex flex-col justify-between ${bgColor} ${highlight ? 'ring-2 ring-amber-400/50' : ''}`}>
    <div className="text-3xl text-center mb-2">
        {icon}
    </div>
    <div className="text-center">
        <div className="text-xs font-medium text-amber-300/80 uppercase tracking-wider mb-1">
            {label}
        </div>
        <div className={`text-2xl font-bold ${color}`}>
            {value}
        </div>
    </div>
</div>;