import {Armor} from "./Armor.js";

export class Enemy {
    constructor(props = undefined) {
        this.name = props?.name ?? "";
        this.hp = props?.hp ?? 1;
        this.current_hp = this.hp;
        this.morale = props?.morale ?? 2;
        this.armor = props?.armor ?? new Armor();
        this.attack_dr = props?.attack_dr ?? 12;
        this.defense_dr = props?.defense_dr ?? 12;
        this.damage_die = props?.damage_die ?? 4;
    }
}