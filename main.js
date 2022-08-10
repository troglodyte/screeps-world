let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
const roleAttacker = require("./role.attacker");
const structureExtension = require('structureExtension')
const structureTower = require('structureTower')
const helpers = require('helpers')
const getAll = helpers.getAll;
const getRCL = helpers.getRCL;
const getEnergy = helpers.getEnergy;


let allSpawns = Object.keys(Game.spawns).map(x => Game.spawns[x].name);
let SPAWN1 = allSpawns[0];

const ATTACKERS_ROLE = 'attacker';
const BUILDER_ROLE = 'builder';
const HARVESTER_ROLE = 'harvester';
const UPGRADER_ROLE = 'upgrader';

const ATTACKERS_LIMIT = 10;
const BUILDER_LIMIT = 7;
const HARVESTER_LIMIT = 7;
const UPGRADER_LIMIT = 7;

/**
 * Game.spawns.Spawn1.createCreep([WORK],'Harvester1',{ role: 'harvester', test : 'test1'});
 *
 */

let l = m => console.log(m);
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

// Game.rooms.sim.createConstructionSite(24,25, STRUCTURE_EXTENSION)

const clearDeadScreepsNames = () => {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }
}


module.exports.loop = function () {
    let tower = Game.getObjectById('TOWER_ID');
    tower && structureTower.towerAttack(tower)

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

    if (harvesters.length > Math.floor(HARVESTER_LIMIT/2)) {
        if (typeof attackers === 'undefined' || attackers.length < ATTACKERS_LIMIT) {
            getEnergy(SPAWN1) > 200 && spawnSmall(ATTACKERS_ROLE)('Attacker-')
        }
    }

    if (harvesters.length > Math.floor(HARVESTER_LIMIT/2) ) {
        if (typeof upgraders === 'undefined' || upgraders.length < UPGRADER_LIMIT) {
            getEnergy(SPAWN1) > 200 && spawnSmall(UPGRADER_ROLE)('Upgrader-');
        }

        if (typeof builders === 'undefined' || builders.length < BUILDER_LIMIT) {
            getEnergy(SPAWN1) > 200 && spawnSmall(BUILDER_ROLE)('Builder-');
        }
    }

    if (builders.length > 0) {
        getRCL(SPAWN1) > 1 && structureExtension.createExtensionOffsetFromSpawn(SPAWN1)
    }

    if (true) {
        l(
            'Room Energy: ' + getEnergy(SPAWN1)
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
