import React from "react";

export const StatBadge = ({label, value}) =>
    <div className="bg-gray-950 px-2 py-1 text-center">
        <span className="text-xs block">{label}</span>
        <span className="font-bold">{value}</span>
    </div>;