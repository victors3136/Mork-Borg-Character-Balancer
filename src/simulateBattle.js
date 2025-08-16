import {Weapon} from "./model/Weapon.js";
import {Enemy} from "./model/Enemy.js";
import {Player} from "./model/Player.js";

const roll = (dice) => Math.floor(Math.random() * dice) + 1;

const rollD20 = () => roll(20);
const roll2D6 = () => roll(6) + roll(6);

const moraleRollFail = morale => roll2D6() > morale;

const anyLeft = (characters) => characters.length > 0;

const halfDefeated = (characters, startingCount) => characters.length <= Math.floor(startingCount / 2);

const dead = character => character.current_hp <= 0;

const badlyInjured = character => character.current_hp <= character.hp / 3;

const hpCheck = (players) => players.filter(player => !dead(player));

const moraleCheck = (enemies, startingCount) => {
    if (!anyLeft(enemies)) return enemies;
    // console.warn("Current version of moraleCheck assumes enemies are homogeneous");
    const morale = enemies[0].morale;
    if (halfDefeated(enemies, startingCount) && moraleRollFail(morale)) return [];
    const enemiesLeft = [];
    for (let currentEnemy of enemies) {
        if (dead(currentEnemy)) {
            continue;
        }
        if (badlyInjured(currentEnemy) && moraleRollFail(morale)) {
            continue;
        }
        enemiesLeft.push(currentEnemy);
    }
    return enemiesLeft;
}
const isCrit = rollValue => rollValue === 20;
const isFumble = rollValue => rollValue === 1;
const getDamageType = weapon => weapon.type === "melee" ? "strength" : "presence";

const playerTurn = (player, enemy) => {
    const rollValue = rollD20();
    const targetRoll = enemy.defense_dr;
    const totalRoll = rollValue + player[getDamageType(player.weapon.type)];
    if (isFumble(rollValue)) {
        // weapon lost -- replaced with fists :)
        player.weapon = new Weapon();
        return;
    }
    const crit = isCrit(rollValue);
    if (totalRoll >= targetRoll || crit) {
        const preliminaryDamage = (crit ? 2 : 1) * roll(player.weapon.damage_die)
            - roll(enemy.armor.reduction_die);
        const damage = Math.max(preliminaryDamage, 0);
        enemy.current_hp -= damage;
    }
}

const enemyTurn = (enemy, player) => {
    const rollValue = rollD20();
    const totalRoll = rollValue + player.agility;
    const targetRoll = enemy.attack_dr + player.armor.agility_dr_penalty;
    if (isCrit(rollValue)) {
        playerTurn(player, enemy);
        return;
    }
    const fumble = isFumble(rollValue);
    if (totalRoll >= targetRoll || fumble) {
        const preliminaryDamage = (fumble ? 2 : 1) * roll(enemy.damage_die)
            - roll(player.armor.reduction_die);
        const damage = Math.max(preliminaryDamage, 0);
        player.current_hp -= damage;
    }
    if (fumble) {
        player.armor.dropOneLevel();
    }
}
export const simulateBattle = async (playerData, enemyData) => {
    const MAX_ROUNDS = 25;
    let players = playerData.map((data) => Player.from(data));
    let enemies = Array.from({length: enemyData.count},
        () => new Enemy(enemyData.props));
    const startingEnemyCount = enemies.length;
    let rounds = 0;
    const turnOrder = roll(6) <= 3 ? ["enemy", "player"] : ["player", "enemy"];
    while (anyLeft(players) && anyLeft(enemies)) {
        rounds++;
        if (rounds >= MAX_ROUNDS) break;
        for (let side of turnOrder) {
            if (side === "player") {
                players = hpCheck(players);
                for (let currentPlayer of players) {
                    enemies = moraleCheck(enemies, startingEnemyCount);
                    // no use in running a turn if no enemies left to attack
                    if (!anyLeft(enemies)) continue;
                    // since all enemies are identical, we can just pick them one by one
                    playerTurn(currentPlayer, enemies[0]);
                }
            }
            if (side === "enemy") {
                enemies = moraleCheck(enemies, startingEnemyCount);
                for (let currentEnemy of enemies) {
                    players = hpCheck(players);
                    // no use in running a turn if no players left to attack
                    if (!anyLeft(players)) continue;
                    const targetPlayer = players[Math.floor(Math.random() * players.length)];
                    enemyTurn(currentEnemy, targetPlayer);
                }
            }
            players = hpCheck(players);
            enemies = moraleCheck(enemies, startingEnemyCount);
        }
    }
    const wasTimeout = rounds >= MAX_ROUNDS;
    const wasWin = !wasTimeout && players.length > 0;
    return {
        timeout: wasTimeout,
        win: wasWin,
        rounds
    };
}


