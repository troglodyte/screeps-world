let helpers = {
    compose: (f, g) => x => f(g(x)),
    l: m => console.log(m),
    triggerEvent: evenListeners => creep => evenListeners.map(callable => callable(creep)),
    getFreeCapacity: structure =>  structure.store && Object.prototype.hasOwnProperty.call(structure.store, 'getFreeCapacity') && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
}

module.exports = helpers;