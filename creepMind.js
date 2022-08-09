const creepSenses = require("./creepSenses");
let creepMind = {
    getSourceDest: creep => Game.getObjectById(creep.memory.sourceDest),
    setSourceDest: creep => dest => creep.memory.sourceDest = dest,
    deleteSourceDest: creep => delete creep.memory.sourceDest,
    ensureSourceDest: creep => !creepMind.getSourceDest(creep) && creepMind.setSourceDest(creep)(creepSenses.getRandomSource(creep))
}

module.exports = creepMind;