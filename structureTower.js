let structureTower = {
    towerAttack: tower => {
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        closestDamagedStructure && tower.repair(closestDamagedStructure);

        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        closestHostile && tower.attack(closestHostile);
    }
}

module.exports = structureTower;