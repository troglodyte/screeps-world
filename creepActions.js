const creepSenses = require("./creepSenses");
const creepMind = require("./creepMind");


const getEnergy = spawn => Game.spawns[spawn].store.energy;

let creepActions = {
    unloadEnergy: creep => {
        let targets = creepSenses.getStructures(creep);
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            // creep.say('no targets')
            console.log('no targets: ' + JSON.stringify(targets))
        }
    },
    harvestSourceDest: creep => {
        let sourceDestInMem = creepMind.getSourceDest(creep);
        if (!sourceDestInMem) {
            let msg = 'no dest';
            creep.say(msg);
            console.log(msg)
        }
        creep.harvest(sourceDestInMem) === ERR_NOT_IN_RANGE && creep.moveTo(
            sourceDestInMem,
            {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            }
        );
    },
    attackIfEnemy: creep => {
        if (creepSenses.areEnemies(creep)) {
            creep.say('Leeroy!')
            let firstEnemy = creepSenses.getFirstEnemy(creep);
            let res = creep.attack(firstEnemy);
            if (res === -12) {
                res = creep.rangedAttack(firstEnemy);
            }
            res === ERR_NOT_IN_RANGE && creep.moveTo(firstEnemy);
        }
        creep.moveTo(25,25) // hopefully out of peeps way
    },
    upgradeController(creep) {
        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}


module.exports = creepActions;