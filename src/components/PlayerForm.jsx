import React, {useState} from "react";
import {Armor} from "../model/Armor.js";

export const PlayerForm = ({onAddPlayer}) => {
    const [formData, setFormData] = useState({
        name: "",
        hp: 1,
        strength: 0,
        agility: 0,
        presence: 0,
        toughness: 0,
        armor: new Armor(),
        shield: false,
        weapon: {
            name: "fists",
            type: "melee",
            damage_die: 2
        }
    });
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked :
                type === "armor" ? new Armor(value) : value
        }));
    };

    const handleArmorChange = (e) => {
        console.log(`Armor change ${e.target.value} from ${formData.armor.type}`);
        setFormData(prev => ({
            ...prev,
            armor: new Armor({type: e.target.value})
        }))
    }
    const handleWeaponChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            weapon: {
                ...prev.weapon,
                [name]: name === "damage_die" ? parseInt(value) : value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlayer({
            ...formData,
            id: Date.now()
        });
        setFormData({
            name: "",
            hp: 1,
            strength: 0,
            agility: 0,
            presence: 0,
            toughness: 0,
            armor: new Armor(),
            shield: false,
            weapon: {
                name: "fists",
                type: "melee",
                damage_die: 2
            }
        });
    };

    return <form onSubmit={handleSubmit} className="space-y-3" style={{marginTop: "1rem"}}>
        <h3 className="font-bold text-lg text-amber-300">Add New Player</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <label className="block text-sm font-medium text-amber-300">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-amber-300 shadow-sm sm:text-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">HP</label>
                <input
                    type="number"
                    name="hp"
                    value={formData.hp}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full rounded-md border-amber-400 shadow-sm sm:text-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">Strength</label>
                <input
                    type="number"
                    name="strength"
                    value={formData.strength}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-amber-400 shadow-sm sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">Agility</label>
                <input
                    type="number"
                    name="agility"
                    value={formData.agility}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-amber-400 shadow-sm sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">Presence</label>
                <input
                    type="number"
                    name="presence"
                    value={formData.presence}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-amber-400 shadow-sm sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300">Toughness</label>
                <input
                    type="number"
                    name="toughness"
                    value={formData.toughness}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-amber-400 shadow-sm sm:text-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-300 mb-2">Armor</label>
                <div className="grid grid-cols-2 gap-3">
                    {['none', 'light', 'medium', 'heavy'].map((armorType) => (
                        <div
                            key={armorType}
                            className="flex items-center p-2 rounded-md border border-amber-400 hover:bg-amber-900 transition-colors"
                        >
                            <input
                                type="radio"
                                id={`armor-${armorType}`}
                                name="armor"
                                value={armorType}
                                checked={formData.armor.type === armorType}
                                onChange={handleArmorChange}
                                className="h-4 w-4 border-amber-300 text-amber-600 focus:ring-amber-500"
                            />
                            <label
                                htmlFor={`armor-${armorType}`}
                                className="ml-2 block text-sm text-amber-300 capitalize flex-1"
                            >
                                {armorType}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-end">
                <div className="flex items-center">
                    <input
                        id="shield"
                        name="shield"
                        type="checkbox"
                        checked={formData.shield}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-amber-500"
                    />
                    <label htmlFor="shield" className="ml-2 block text-sm text-amber-300" style={{marginLeft: "1rem"}}>
                        Has Shield
                    </label>
                </div>
            </div>
        </div>

        <div className="border-t pt-3" style={{marginTop: "1rem"}}>
            <h4 className="font-medium mb-2 text-amber-300">Weapon</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium text-amber-300">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.weapon.name}
                        onChange={handleWeaponChange}
                        className="mt-1 block w-full rounded-md border-amber-400 shadow-sm sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-amber-300 mb-2">Type</label>
                    <div className="space-y-2">
                        {['melee', 'ranged'].map((weaponType) => (
                            <div key={weaponType} className="flex items-center rounded-md hover:bg-amber-900 transition-colors">
                                <input
                                    type="radio"
                                    id={`weapon-${weaponType}`}
                                    name="type"
                                    value={weaponType}
                                    checked={formData.weapon.type === weaponType}
                                    onChange={handleWeaponChange}
                                    className="h-4 w-4 border-amber-300 text-amber-600 focus:ring-amber-500"
                                />
                                <label
                                    htmlFor={`weapon-${weaponType}`}
                                    className="ml-2 block text-sm text-amber-300 capitalize"
                                >
                                    {weaponType}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-amber-300">Damage Die</label>
                    <input
                        type="number"
                        name="damage_die"
                        value={formData.weapon.damage_die}
                        onChange={handleWeaponChange}
                        min="1"
                        className="mt-1 block w-full rounded-md border-amber-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
        </div>

        <button
            type="submit"
            style={{marginTop: "1rem"}}
            className="w-full text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
            Add Player
        </button>
    </form>;
};