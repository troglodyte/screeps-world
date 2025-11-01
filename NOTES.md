https://docs.screeps.com/api/#Room.createConstructionSite

#todo
[ ] Automatic road building
    find path to x (resource|spawn|room controller) 
    get next 'step' in path
    use that x,y to create road

[ ] Automatic extension/container building
    currently we just get x+/y+ cords until we can build on
    adjust to encircle the base
    
[ ] Create event's based on RCL level (room control level)
    For instance, we can only create x amount of extensions per RCL
    and you can only create towers at RCL 3+

[ ] walls, ramparts 
[ ] What else is there?


```js
// x y structureType name
Game.rooms.sim.createConstructionSite(23, 23, STRUCTURE_EXTENSION);
Game.rooms.sim.createConstructionSite(10, 15, STRUCTURE_ROAD);
Game.rooms.sim.createConstructionSite(10, 15, STRUCTURE_SPAWN,'MySpawn2');
```
```js
    // construction sites
    STRUCTURE_SPAWN: "spawn",
    STRUCTURE_EXTENSION: "extension",
    STRUCTURE_ROAD: "road",
    STRUCTURE_WALL: "constructedWall",
    STRUCTURE_RAMPART: "rampart",
    STRUCTURE_KEEPER_LAIR: "keeperLair",
    STRUCTURE_PORTAL: "portal",
    STRUCTURE_CONTROLLER: "controller",
    STRUCTURE_LINK: "link",
    STRUCTURE_STORAGE: "storage",
    STRUCTURE_TOWER: "tower",
    STRUCTURE_OBSERVER: "observer",
    STRUCTURE_POWER_BANK: "powerBank",
    STRUCTURE_POWER_SPAWN: "powerSpawn",
    STRUCTURE_EXTRACTOR: "extractor",
    STRUCTURE_LAB: "lab",
    STRUCTURE_TERMINAL: "terminal",
    STRUCTURE_CONTAINER: "container",
    STRUCTURE_NUKER: "nuker",
    STRUCTURE_FACTORY: "factory",
    STRUCTURE_INVADER_CORE: "invaderCore",
```
