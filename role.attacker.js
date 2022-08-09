const creepActions = require("./creepActions");

let roleAttacker = {
    run: function(creep) {
        creepActions.attackIfEnemy(creep)
    }
}

module.exports = roleAttacker;