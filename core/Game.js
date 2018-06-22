const Event = require('./Event');

const AssetManager = require('../modules/AssetManager');
const Camera = require('../modules/Camera');
const Connection = require('../modules/Connection');
const DeviceManager = require('../modules/DeviceManager');
const Initializer = require('../modules/Initializer');
const LibraryManager = require('../modules/LibraryManager');
const Loop = require('../modules/Loop');
const Player = require('../modules/Player');
const Renderer = require('../modules/Renderer');
const Settings = require('../modules/Settings');
const TaskManager = require('../modules/TaskManager');
const Viewport = require('../modules/Viewport');
const World = require('../modules/World');

module.exports = class Game extends Event.Emitter {

    constructor (name, plugins = [ ]) {
        super(name);

        this.plugins = plugins;

        for (const mod of Object.keys(module.exports)) {
            this[ mod ] = new module.exports[ mod ](mod, this);
        }

        const exclude = [ 'kind', 'plugins', 'observables' ];
        const modules = Object.keys(this).filter(key => !exclude.includes(key));

        for (const mod of modules.map(mod => this[ mod ])) {
            mod.connect(this);
        }

        this.refresh();
    }

    refresh (hard) {
        for (const plugin of this.plugins) if (hard || !plugin.applied) {
            plugin.patch(this);
        }
    }

    play (host) {
        this.emit('play', [ host ]);
    }

    quit (code) {
        this.emit('quit', [ code ]);
    }

    extend (plugin) {
        this.plugins.push(plugin);
    }
}

module.exports.assets = AssetManager;
module.exports.camera = Camera;
module.exports.connection = Connection;
module.exports.devices = DeviceManager;
module.exports.initializer = Initializer;
module.exports.library = LibraryManager;
module.exports.loop = Loop;
module.exports.player = Player;
module.exports.renderer = Renderer;
module.exports.settings = Settings;
module.exports.tasks = TaskManager;
module.exports.viewport = Viewport;
module.exports.world = World;
