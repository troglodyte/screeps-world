const creepActions = require("./creepActions");
const creepSenses = require('creepSenses')
const helpers = require("./helpers");
let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgrading = false;
            //creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
	        creep.memory.upgrading = true;
	        // creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            creepActions.upgradeController(creep)
        }
        else {

            // @todo harvest energy if no containers
            let containers = creepSenses.getContainers(creep)
            if (containers.length < 1) {
                // creep.say('mine')
                let sources = creepSenses.getSources(creep)
                if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                // creep.say('container')
                let firstContainer = containers.length === 1 ? containers.shift() : containers[helpers.getRandomInt(containers.length)];
                creep.withdraw(firstContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE && creep.moveTo(firstContainer)
            }
        }
	}
};

module.exports = roleUpgrader;