import {PlayerCard} from "./PlayerCard.jsx";
import React from "react";

export const PlayerCardScrollArea = (props) => <div className="flex overflow-x-auto pb-2 gap-2 p-4">
    {props.players.map(player => <PlayerCard
        key={player.id}
        player={player}
        onDelete={props.deletePlayer}
    />)}
</div>;