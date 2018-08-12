const Application = require('quantum/core/Application');

const AssetManager = require('../modules/AssetManager');
const Camera = require('../modules/Camera');
const Connection = require('../modules/Connection');
const DeviceManager = require('../modules/DeviceManager');
const Initializer = require('../modules/Initializer');
const LibraryManager = require('../modules/LibraryManager');
const Loop = require('../modules/Loop');
const Player = require('../modules/Player');
const Renderer = require('../modules/Renderer');
const Viewport = require('../modules/Viewport');
const World = require('../modules/World');

Object.assign(Application.modules, {
    assets: AssetManager,
    camera: Camera,
    connection: Connection,
    devices: DeviceManager,
    initializer: Initializer,
    libraries: LibraryManager,
    loop: Loop,
    player: Player,
    renderer: Renderer,
    viewport: Viewport,
    world: World
});

module.exports = Application;
