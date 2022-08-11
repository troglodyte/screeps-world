let creepSenses = require('creepSenses')
let creepActions = require('creepActions')
const helpers = require("./helpers");
const WALL_HP_MULITPLIER = 20000;

let roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
			creep.memory.building = false;
			//creep.say('🔄 harvest');
		}
		if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
			creep.memory.building = true;
			//creep.say('🚧 build');
		}

		if(creep.memory.building) {
			let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			// console.log('CONSTRUCTION SITES: ' + targets)
			if(targets.length) {
				if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			} else {
				creepActions.upgradeController(creep)
			}


			let walls = creep.room.find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_WALL});
			let spawn = helpers.getFirstLocalSpawn(creep);
			// let walls = creep.room.find(FIND_MY_STRUCTURES);
			// console.log('WALLS: ' + walls)
			let lowHpWalls = walls.filter(w => w.hits < (WALL_HP_MULITPLIER * spawn.room.controller.level));
			// console.log(lowHpWalls)
			if (lowHpWalls.length > 0) {
				let wallTarget = lowHpWalls.shift();
				// console.log(wallTarget)
				if(creep.repair(wallTarget) === ERR_NOT_IN_RANGE) {
					creep.moveTo(wallTarget, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}

		} else {
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
				return
			}
			let sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		}
	}
};

module.exports = roleBuilder
