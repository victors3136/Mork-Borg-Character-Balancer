import {StatBadge} from "./StatBadge.jsx";
import {TrashIcon} from "./TrashIcon.jsx";
import React from "react";

export const PlayerCard = ({player, onDelete}) => <div className="w-60 min-w-60 max-w-60 m-4 p-6 border
                    border-amber-400/40 bg-gradient-to-b from-zinc-900 to-zinc-800 shadow-md
                    hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-200 relative">

    <div className="flex justify-between items-start mb-5">
        <div className="min-w-0">
            <h3 className="font-bold text-xl text-amber-300 truncate" title={player.name}>
                {player.name}
            </h3>
            <div className="flex items-center mt-2">
                <span className="text-sm font-mono">
        HP: <span className="text-amber-300 font-bold">{player.hp}</span>
      </span>
            </div>
        </div>
        <button
            onClick={(e) => {
                e.stopPropagation();
                onDelete(player.id);
            }}
            className="p-2 rounded-full hover:bg-red-500/20 transition-colors text-amber-400/70 hover:text-red-400"
            aria-label="Delete player"
        >
            <TrashIcon className="w-5 h-5"/>
        </button>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-5 px-1">
        <StatBadge label="STR" value={player.strength} color="red"/>
        <StatBadge label="AGI" value={player.agility} color="blue"/>
        <StatBadge label="PRE" value={player.presence} color="yellow"/>
        <StatBadge label="TGH" value={player.toughness} color="green"/>
    </div>

    <div className="border-t border-amber-400/20 my-4"/>

    <div className="text-sm space-y-3 px-1">
        <div className="flex items-center">
            <span
                className="capitalize">{player.armor.type === "none" ? "no" : player.armor.type} Armor</span>
        </div>
        <div className="flex items-center">
            <div>
                <p className="capitalize">{player.weapon.type} Weapon</p>
                <p className="text-xs opacity-80 font-mono">
                    {player.weapon.name} (D{player.weapon.damage_die})
                </p>
            </div>
        </div>
        <div className="flex items-center">
            <span>
      Shield:{" "}
                <span className={player.shield ? "text-green-400" : "text-red-400"}>
        {player.shield ? "Equipped" : "None"}
      </span>
    </span>
        </div>
    </div>
</div>;
