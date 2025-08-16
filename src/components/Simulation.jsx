import React, {useState} from "react";
import {simulateBattle} from "../simulateBattle.js";
import {PlayerForm} from "./PlayerForm.jsx";
import {EnemyForm} from "./EnemyForm.jsx";
import {SimulationResults} from "./SimulationResults.jsx";
import {PlayerCardScrollArea} from "./PlayerCardScrollArea.jsx";
import {Armor} from "../model/Armor.js";
import {Player} from "../model/Player.js";

const runSimulations = async (numSims, players, enemyData) => {
    let partialWins = 0;
    let totalWins = 0;
    let timeouts = 0;
    let totalRounds = [];
    const simPromises = Array.from({length: numSims}, () => simulateBattle(players, enemyData));
    const results = await Promise.all(simPromises);

    for (let result of results) {
        if(results.timeout) timeouts ++;
        else if(result.totalWin) totalWins ++;
        else if (result.partialWin) partialWins++;

        totalRounds.push(result.rounds);
    }

    return {
        simulations: numSims,
        timeoutRate: ((timeouts / numSims) * 100).toFixed(1),
        partialWinRate: ((partialWins / numSims) * 100).toFixed(1),
        totalWinRate: ((totalWins / numSims) * 100).toFixed(1),
        avgRounds: ([...totalRounds].reduce((a, b) => a + b, 0) / totalRounds.length).toFixed(0),
    };
};


export const Simulation = () => {
    const [players, setPlayers] = useState([]);
    const [enemyData, setEnemyData] = useState({
        count: 1,
        props: {
            name: "Goblin",
            hp: 4,
            morale: 8,
            armor: new Armor(),
            attack_dr: 12,
            defense_dr: 12,
            damage_die: 4
        }
    });
    const [results, setResults] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const SIMULATION_COUNT = 10_000;
    const addPlayer = (player) => {
        setPlayers([...players, new Player(player)]);
    };

    const deletePlayer = (id) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const handleRunSimulations = () => {
        if (players.length === 0) {
            alert("Please add at least one player");
            return;
        }

        setIsRunning(true);
        runSimulations(SIMULATION_COUNT, players, enemyData)
            .then(r => setResults(r))
            .catch(e => {
                console.log(e);
                alert("Error running simulations");
            }).finally(() => setIsRunning(false));
    };

    return <div className="p-6 max-w-6xl mx-auto min-h-screen justify-between w-full pt-20 overflow-x-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"
             style={{marginTop: "64px", marginLeft: "16px", marginRight: "16px"}}>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Players</h2>
                    <span className="px-3 py-1 text-sm">
                        {players.length} added
                    </span>
                </div>

                <div className="mb-4" style={{marginTop: "1rem", marginBottom: "1rem"}}>
                    <PlayerForm onAddPlayer={addPlayer}/>
                </div>

                <div className="mt-6">
                    <h3 className="font-medium mt-2 mb-4">Current Players</h3>
                    {players.length === 0 ?
                        <p className="text-gray-500 italic py-4 text-center">No players added yet</p> :
                        <PlayerCardScrollArea players={players} deletePlayer={deletePlayer}/>
                    }
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-lg shadow p-4">
                    <EnemyForm
                        enemyData={enemyData}
                        setEnemyData={setEnemyData}
                    />
                </div>

                <div className="rounded-lg shadow p-4" style={{marginTop: "1rem"}}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold" style={{marginTop: "1rem"}}>Battle Simulation</h2>
                    </div>

                    <button
                        style={{marginTop: "1rem"}}
                        onClick={handleRunSimulations}
                        disabled={isRunning}
                        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                            isRunning
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-amber-300 hover:bg-amber-600"
                        }`}
                    >
                        {isRunning ? <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running Simulations...
            </span> : "Run Simulations"}
                    </button>
                    <SimulationResults results={results}/>
                </div>
            </div>
        </div>
    </div>;
};
