import {StatBadge} from "./StatBadge.jsx";
import {TrashIcon} from "./TrashIcon.jsx";
import React from "react";

export const PlayerCard = ({player, onDelete}) => (<div className="w-48 min-w-48 max-w-48 m-4 p-4 border rounded-md">

        <div className="flex justify-between items-center mb-2">
            <div className="min-w-0">
                <h3 className="font-bold text-lg truncate">{player.name}</h3>
                <p className="text-sm">HP: {player.hp}</p>
            </div>
            <button
                onClick={() => onDelete(player.id)}
                aria-label="Delete player"
            >
                <TrashIcon className="w-5 h-5"/>
            </button>
        </div>

        <div className="grid grid-cols-2 gap-1 mb-3">
            <StatBadge label="STR" value={player.strength}/>
            <StatBadge label="AGI" value={player.agility}/>
            <StatBadge label="PRE" value={player.presence}/>
            <StatBadge label="TGH" value={player.toughness}/>
        </div>

        <div className="text-sm space-y-1">
            <p>Armor: <span className="capitalize">{player.armor.type}</span></p>
            <p className="capitalize"> {player.weapon.type} Weapon: </p>
            <p>{player.weapon.name} (D{player.weapon.damage_die})</p>
            <p>Shield: {player.shield ? "Yes" : "No"}</p>
        </div>
    </div>);