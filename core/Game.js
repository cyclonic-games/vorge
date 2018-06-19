const Event = require('vorge/core/Event');

const AssetManager = require('vorge/modules/AssetManager');
const Camera = require('vorge/modules/Camera');
const Connection = require('vorge/modules/Connection');
const DeviceManager = require('vorge/modules/DeviceManager');
const Initializer = require('vorge/modules/Initializer');
const Loop = require('vorge/modules/Loop');
const Player = require('vorge/modules/Player');
const Renderer = require('vorge/modules/Renderer');
const Settings = require('vorge/modules/Settings');
const TaskManager = require('vorge/modules/TaskManager');
const Viewport = require('vorge/modules/Viewport');
const World = require('vorge/modules/World');

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
module.exports.loop = Loop;
module.exports.player = Player;
module.exports.renderer = Renderer;
module.exports.settings = Settings;
module.exports.tasks = TaskManager;
module.exports.viewport = Viewport;
module.exports.world = World;
