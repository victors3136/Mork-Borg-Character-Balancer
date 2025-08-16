export class Weapon {
    constructor(props) {
        this.name = props?.name ?? "fists";
        this.type = props?.type ?? "melee";
        this.damage_die = props?.damage_die ?? 2;
    }
}