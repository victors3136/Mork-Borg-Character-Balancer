import {armorStats} from "./armorStats.js";

export class Armor {
    constructor(props = undefined) {
        this.type = props?.type ?? "none";
        const {reduction_die, agility_dr_penalty} = armorStats[this.type];
        this.reduction_die = reduction_die;
        this.agility_dr_penalty = agility_dr_penalty;
    }

    dropOneLevel = () => {
        const types = ["none", "light", "medium", "heavy"];
        const index = types.indexOf(this.type);
        if (index > 0) {
            this.type = types[index - 1];
            this.reduction_die = armorStats[this.type].reduction_die;
        }
    }
}