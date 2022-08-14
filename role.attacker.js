const creepActions = require("./creepActions");
const creepSenses = require("./creepSenses");

let roleAttacker = {
    run: function(creep) {
        //creepActions.attackIfEnemy(creep)

        // let invaderCore = creep.room.find(FIND_HOSTILE_STRUCTURES);
        // console.log(JSON.stringify(invaderCore))
        let enemy = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES)
        // console.log(closestEnemyStructure)
        // [{"id":"a1d4e012a42fef8","room":{"name":"W7N4","energyAvailable":0,"energyCapacityAvailable":0,"visual":{"roomName":"W7N4"}},"pos":{"x":37,"y":15,"roomName":"W7N4"},"effects":[{"power":1002,"effect":1002,"ticksRemaining":30339}],"level":0,"spawning":null,"owner":{"username":"Invader"},"my":false,"hits":100000,"hitsMax":100000,"structureType":"invaderCore"}]
        if (enemy) {
            //creep.say('Leeroy!')
            // console.log(creep.body.map(b => b.type))
            let hasAttack = creep => creep.body.filter(b => b.type === 'attack').length > 0;
            let hasRangedAttack = creep => creep.body.filter(b => b.type === 'ranged_attack').length > 0;
            // console.log(enemy)
            hasAttack(creep) && creep.attack(enemy) === ERR_NOT_IN_RANGE && creep.moveTo(enemy);
            if (hasRangedAttack(creep)){
                if(creep.rangedAttack(enemy) === ERR_NOT_IN_RANGE) {
                    console.log(creep.moveTo(enemy));
                }
            }
        } else if(!enemy && Game.flags.Flag1) {
            creep.moveTo(Game.flags.Flag1)
        } else {
            creepActions.attackIfEnemy(creep)
        }

        // creep.memory.roomTarget = 'W7N4';
        // //console.log(Game.rooms[creep.memory.roomTarget].name)
        // // console.log(Object.keys(Game.rooms).filter(r => r.name = 'W7N4').name)
        // // Object.keys(Game.rooms).map(r => console.log('name: ' + r.name))
        // // console.log(Object.keys(Game.map.rooms))
        // if (creep.memory.roomTarget && creep.memory.roomTarget !== creep.room.name) {
        //     // creep.moveTo(Game.rooms[creep.memory.roomTarget]);
        //     creep.moveTo(
        //         creep.pos.findClosestByRange(
        //             creep.room.findExitTo(
        //                 creep.room.roomTarget
        //             )
        //         )
        //     );
        // }
    }
}

module.exports = roleAttacker;

// Game.creeps['Attacker-40593'].memory.roomTarget = 'W7N4';
//
// .map(c => c.memory.roomTarget = 'W7N4');

// Object.keys(Game.creeps).filter(x => Game.creeps[x].memory.role === 'attacker').map(c => Game.creeps[c].memory.roomTarget = 'W7N4')

// if (creep.moveTo(pos) == ERR_NO_PATH) {
//     if (this.pos.x <= 1) {
//         if (this.move(RIGHT) == OK) {
//             return
//         }
//     }
//     if (this.pos.x >= 48) {
//         if (this.move(LEFT) == OK) {
//             return
//         }
//     }
//     if (this.pos.y <= 1) {
//         if (this.move(BOTTOM) == OK) {
//             return
//         }
//     }
//     if (this.pos.y >= 48) {
//         if (this.move(TOP) == OK) {
//             return
//         }
//     }
// }