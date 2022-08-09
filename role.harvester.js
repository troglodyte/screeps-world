const helpers = require('helpers');
const creepActions = require('creepActions')
const creepMind = require("./creepMind");

let fullCapacityEvent = [];
fullCapacityEvent.push(creep => creep.say('im full'))
fullCapacityEvent.push(creepMind.deleteSourceDest)
fullCapacityEvent.push(creepActions.unloadEnergy)

let hasCapacityEvent = [];
hasCapacityEvent.push(creepMind.ensureSourceDest)
hasCapacityEvent.push(creepActions.harvestSourceDest)

const triggerFull = helpers.triggerEvent(fullCapacityEvent)
const triggerHungry = helpers.triggerEvent(hasCapacityEvent)

let roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.room.find(FIND_SOURCES).map(source => {
        //     console.log(source.pos.x + ' ' +source.pos.y)
        // })
	    creep.store.getFreeCapacity() > 0 ? triggerHungry(creep) : triggerFull(creep)
	}
};

module.exports = roleHarvester;