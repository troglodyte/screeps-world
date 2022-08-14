let helpers = {
    compose: (f, g) => x => f(g(x)),
    l: m => console.log(m),
    triggerEvent: evenListeners => creep => evenListeners.map(callable => callable(creep)),
    getFreeCapacity: structure =>  structure.store && Object.prototype.hasOwnProperty.call(structure.store, 'getFreeCapacity') && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
    getAll: type => Object.keys(Game.creeps).filter(x => Game.creeps[x].memory.role === type),
    getLocalSpawns: creep => creep.room.find(FIND_MY_SPAWNS),
    getFirstLocalSpawn: creep => helpers.getLocalSpawns(creep).shift(),
    getSpawnX: name => Game.spawns[name].pos.x,
    getSpawnY: name => Game.spawns[name].pos.y,
    getRCL: spawn => Game.spawns[spawn].room.controller.level,
    getEnergy: spawn => Game.spawns[spawn].room.energyAvailable,
    getRandomInt: max => Math.floor(Math.random() * max),
    getRandomBool: Math.floor(Math.random() * 0.5),
    calculateScreepCost: bodyParts =>
        bodyParts.reduce(
            (cost, bodyPart) => {
                return cost + {
                    MOVE: 50,
                    WORK: 100,
                    CARRY: 50,
                    ATTACK: 80,
                    RANGED_ATTACK: 150,
                    HEAL: 250,
                    CLAIM: 600,
                    TOUGH: 10,
                }[bodyPart.toUpperCase()]
            }, 0)

}

module.exports = helpers;