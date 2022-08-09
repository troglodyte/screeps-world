let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
const roleAttacker = require("./role.attacker");

let allSpawns = Object.keys(Game.spawns).map(x => Game.spawns[x].name);
let SPAWN1 = allSpawns[0];

const ATTACKERS_ROLE = 'attacker';
const BUILDER_ROLE = 'builder';
const HARVESTER_ROLE = 'harvester';
const UPGRADER_ROLE = 'upgrader';

const ATTACKERS_LIMIT = 10;
const BUILDER_LIMIT = 5;
const HARVESTER_LIMIT = 5;
const UPGRADER_LIMIT = 8;

/**
 * Game.spawns.Spawn1.createCreep([WORK],'Harvester1',{ role: 'harvester', test : 'test1'});
 *
 */

let l = m => console.log(m);
let getAll = type => Object.keys(Game.creeps).filter(x => Game.creeps[x].memory.role === type);
let killCreeps = name => {
    Game.creeps[name].say(' im out');
    Game.creeps[name].suicide()
}

const spawnSmall = (role) => (newName) => {
    let body = []
    switch (role) {
        case ATTACKERS_ROLE:
            body = [RANGED_ATTACK, MOVE, TOUGH] //, TOUGH, TOUGH, TOUGH, TOUGH] // 250
            break;
        case BUILDER_ROLE:
        case HARVESTER_ROLE:
        case UPGRADER_ROLE:
            body = [WORK, CARRY, MOVE];
            break;
    }
    console.log('trying to spawn (' + role + '): ' + Game.spawns[SPAWN1].spawnCreep(body, newName + Game.time, {memory: {role: role}}));
}

// const createStructure = structureType => x => y => Game.rooms.sim.createConstructionSite(x, y, structureType);
//
// const createExtension = createStructure(STRUCTURE_EXTENSION);

const getSpawnX = name => Game.spawns[name].pos.x;
const getSpawnY = name => Game.spawns[name].pos.y;

const createExt = room => x => y => {
    return Game.rooms[room].createConstructionSite(x,y, STRUCTURE_EXTENSION)
}

const createExtensionOffsetFromSpawn = spawn => {
    const limit = 5;
    let count = 0;
    let x = getSpawnX(spawn) + 1;
    let y = getSpawnY(spawn);
    // console.log('Spawn is at: ' + getSpawnX(spawn) + ', ' + getSpawnY(SPAWN1))
    let flipFlop = false;
    let room = Object.keys(Game.rooms).map(x => Game.rooms[x].name).shift()
    let createExtension = createExt(room);
    let res = createExtension(x)(y);
    if (res === ERR_RCL_NOT_ENOUGH) return;
    while (count++ < limit && res !== 0) {
        flipFlop = !flipFlop;
        flipFlop ? x++ : y++;
        res = createExtension(x)(y);
        console.log(x + ' ' + y + ' res: ' + res)
    }
    if (res === 0) {
        return;
    }
    count = 0;
    while (count++ < limit && res !== 0) {
        flipFlop = !flipFlop;
        flipFlop ? x-- : y--;
        res = createExtension(x)(y);
        console.log(x + ' ' + y + ' res: ' + res)
    }
}

// Game.rooms.sim.createConstructionSite(24,25, STRUCTURE_EXTENSION)

const clearDeadScreepsNames = () => {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}
const getRCL = spawn => Game.spawns[spawn].room.controller.level;
const getEnergy = spawn => Game.spawns[spawn].store.energy;


module.exports.loop = function () {
    let tower = Game.getObjectById('TOWER_ID');
    if (tower) {
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    clearDeadScreepsNames();

    let harvesters = getAll(HARVESTER_ROLE);
    let upgraders = getAll(UPGRADER_ROLE);
    let builders = getAll(BUILDER_ROLE);
    let attackers = getAll(ATTACKERS_ROLE);

    if (typeof harvesters === 'undefined' || harvesters.length < HARVESTER_LIMIT) {
        getEnergy(SPAWN1) > 200 && spawnSmall(HARVESTER_ROLE)('Harvester-')
    } else {
        // let excess = harvesters.slice(HARVESTER_LIMIT, harvesters.length);
        // excess.map(killCreeps)
    }

    if (harvesters.length > 2) {
        if (typeof attackers === 'undefined' || attackers.length < ATTACKERS_LIMIT) {
            getEnergy(SPAWN1) > 200 && spawnSmall(ATTACKERS_ROLE)('Attacker-')
        }
    }

    if (harvesters.length > 2) {
        if (typeof upgraders === 'undefined' || upgraders.length < UPGRADER_LIMIT) {
            getEnergy(SPAWN1) > 200 && spawnSmall(UPGRADER_ROLE)('Upgrader-');
        }

        if (typeof builders === 'undefined' || builders.length < BUILDER_LIMIT) {
            getEnergy(SPAWN1) > 200 && spawnSmall(BUILDER_ROLE)('Builder-');
        }
    }

    if (builders.length > 0) {
        getRCL(SPAWN1) > 1 && createExtensionOffsetFromSpawn(SPAWN1)
    }

    if (true) {
        l(
            'Energy: ' + getEnergy(SPAWN1)
            + ' RCL: ' + getRCL(SPAWN1)
            + ' ' + HARVESTER_ROLE + ':' + harvesters.length + ' '
            + UPGRADER_ROLE + ':' + upgraders.length + ' '
            + BUILDER_ROLE + ':' + builders.length + ' '
            + ATTACKERS_ROLE + ':' + attackers.length
        );
    }

    harvesters.map(name => roleHarvester.run(Game.creeps[name]))
    upgraders.map(name => roleUpgrader.run(Game.creeps[name]));
    builders.map(name => roleBuilder.run(Game.creeps[name]))
    attackers.map(name => roleAttacker.run(Game.creeps[name]));
    // attackers.map(name => Game.creeps[name].suicide())




    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === HARVESTER_ROLE) {
            // roleHarvester.run(creep);
        }

        if (creep.memory.role === UPGRADER_ROLE) {
            // roleUpgrader.run(creep);
        }

        if (creep.memory.role === BUILDER_ROLE) {
            // roleBuilder.run(creep);
        }
    }
}
