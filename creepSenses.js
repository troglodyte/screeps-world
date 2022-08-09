let helpers = require('helpers')

let creepSenses = {
    getSources: creep => {
        return creep.room.find(FIND_SOURCES);
    },
    getRandomSource: creep => {
        let sources = creepSenses.getSources(creep)

        // @todo remove -  Avoid the bad spot in the tutorial 6,44
        sources = sources.filter(s => s.pos.x !== 6 && s.pos.y !== 44)

        if (sources.length === 1) return sources[0];
        let randSource = sources[Math.floor(Math.random() * sources.length)];
        creep.say('mmm resources...')
        return randSource.id;
    },
    getStructures: creep => creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            switch (structure.structureType) {
                case STRUCTURE_EXTENSION:
                case STRUCTURE_SPAWN:
                case STRUCTURE_TOWER:
                    return helpers.getFreeCapacity(structure);
                default:
                    return false;
            }
        }
    }),
    areEnemies: creep => creep.room.find(FIND_HOSTILE_CREEPS).length > 0,
    getFirstEnemy: creep => creep.room.find(FIND_HOSTILE_CREEPS).shift()
}

module.exports = creepSenses;

//   Game.rooms.<insert room name>.find(FIND_HOSTILE_CREEPS, {
//     filter:function(enemy){enemy.owner.username !== 'Source Keeper'} // !== or ===, depending on use case
// });