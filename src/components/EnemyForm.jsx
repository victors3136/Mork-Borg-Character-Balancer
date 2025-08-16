import React from "react";
import {Armor} from "../model/Armor.js";

export const EnemyForm = ({enemyData, setEnemyData}) => {
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setEnemyData(prev => ({
            ...prev,
            props: {
                ...prev.props,
                [name]: type === "checkbox" ? checked : value
            }
        }));
    };

    const handleCountChange = (e) => {
        setEnemyData(prev => ({
            ...prev,
            count: parseInt(e.target.value)
        }));
    };

    const handleArmorChange = (e) => {
        setEnemyData(prev => ({
            ...prev,
            props: {
                ...prev.props,
                armor: new Armor({type: e.target.value})
            }
        }));
    };

    return <div className="space-y-3" style={{marginTop: "3rem"}}>
        <h3 className="font-bold text-lg text-amber-300">Enemy Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <label className="block text-sm font-medium text-amber-300">Enemy Count</label>
                <input
                    type="number"
                    value={enemyData.count}
                    onChange={handleCountChange}
                    min="1"
                    className="mt-1 block w-full sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">Name</label>
                <input
                    type="text"
                    name="name"
                    value={enemyData.props.name}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">HP</label>
                <input
                    type="number"
                    name="hp"
                    value={enemyData.props.hp}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">Morale</label>
                <input
                    type="number"
                    name="morale"
                    value={enemyData.props.morale}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-amber-300 mb-2">Armor</label>
                <div className="grid grid-cols-2 gap-3">
                    {['none', 'light', 'medium', 'heavy'].map((armorType) => (
                        <div
                            key={armorType}
                            className="flex items-center p-2 rounded-md border border-amber-400 rounded-md hover:bg-amber-900 transition-colors"
                        >
                            <input
                                type="radio"
                                id={`enemy-armor-${armorType}`}
                                name="enemy-armor"
                                value={armorType}
                                checked={enemyData.props.armor.type === armorType}
                                onChange={handleArmorChange}
                                className="h-4 w-4 border-amber-300 text-amber-600 focus:ring-amber-500"
                            />
                            <label
                                htmlFor={`enemy-armor-${armorType}`}
                                className="ml-2 block text-sm text-amber-300 capitalize flex-1 cursor-pointer"
                            >
                                {armorType}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-amber-300">Attack DR</label>
                <input
                    type="number"
                    name="attack_dr"
                    value={enemyData.props.attack_dr}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">Defense DR</label>
                <input
                    type="number"
                    name="defense_dr"
                    value={enemyData.props.defense_dr}
                    onChange={handleChange}
                    className="mt-1 block w-full sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">Damage Die</label>
                <input
                    type="number"
                    name="damage_die"
                    value={enemyData.props.damage_die}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full sm:text-sm"
                />
            </div>
        </div>
    </div>;
};