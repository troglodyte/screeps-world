const helpers = require('helpers');

let structureExtension = {
    createExt: room => x => y => {
        return Game.rooms[room].createConstructionSite(x,y, STRUCTURE_EXTENSION)
    },
    createExtensionOffsetFromSpawn: spawn => {
        const loopLimit = 5;

        let loopCount = 0;
        let flipFlop = false;
        let x = helpers.getSpawnX(spawn) + 1;
        let y = helpers.getSpawnY(spawn);

        let room = Object.keys(Game.rooms).map(x => Game.rooms[x].name).shift()
        let createExtension = structureExtension.createExt(room);
        let res = createExtension(x)(y);
        if (res === ERR_RCL_NOT_ENOUGH) {
            return;
        }

        while (loopCount++ < loopLimit && res !== 0) {
            flipFlop = !flipFlop;
            flipFlop ? x++ : y++;
            res = createExtension(x)(y);
            // console.log(x + ' ' + y + ' res: ' + res)
        }

        if (res === 0) {
            return;
        }

        loopCount = 0;
        while (loopCount++ < loopLimit && res !== 0) {
            flipFlop = !flipFlop;
            flipFlop ? x-- : y--;
            res = createExtension(x)(y);
            // console.log(x + ' ' + y + ' res: ' + res)
        }
    }
}

module.exports = structureExtension;