import {Armor} from "./Armor.js";
import {Weapon} from "./Weapon.js";

export class Player {
    constructor(props) {
        this.id = props?.id ?? null;
        this.name = props?.name ?? "Anonymous";
        this.hp = props?.hp ?? 1;
        this.current_hp = this.hp;
        this.strength = props?.strength ?? 0;
        this.agility = props?.agility ?? 0;
        this.presence = props?.presence ?? 0;
        this.toughness = props?.toughness ?? 0;
        this.armor = props?.armor ?? new Armor();
        this.shield = props?.shield ?? false;
        this.weapon = props?.weapon ?? new Weapon();
    }

    static from(playerData) {
        return new Player({
            id: playerData.id,
            name: playerData.name,
            hp: playerData.hp,
            strength: playerData.strength,
            agility: playerData.agility,
            presence: playerData.presence,
            toughness: playerData.toughness,
            armor: playerData.armor,
            shield: playerData.shield,
            weapon: playerData.weapon
        });
    }
}