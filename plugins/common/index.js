const Plugin = require('../../core/Plugin');

const Gamepad = require('./devices/Gamepad');
const Keyboard = require('./devices/Keyboard');
const Mouse = require('./devices/Mouse');

const fragment = require('./shaders/default/fragment');
const vertex = require('./shaders/default/vertex');

const spawn = require('./tasks/spawn');

const gamepad = new Gamepad('gamepad');
const keyboard = new Keyboard('keyboard');
const mouse = new Mouse('mouse');

module.exports = new Plugin('common', game => {
    game.devices.install(gamepad);
    game.devices.install(keyboard);
    game.devices.install(mouse);

    game.loop.subscribe('update').filter(() => keyboard.key('h')).forEach(() => {
        console.log('h key is down');
    });

    game.renderer.subscribe('attach').forEach(() => {
        game.renderer.bind('default', [ fragment, vertex ]);
    });

    game.tasks.subscribe('handshake').forEach(() => {
        game.tasks.create('authenticate', [ 'admin', '1234' ]);
    });

    game.tasks.subscribe('authorize').forEach(() => {
        game.tasks.create('provision', game.connection.id);
    });

    game.tasks.subscribe('spawn').forEach(method => {
        spawn.apply(game, method.arguments);
    });

    game.viewport.mount(document.getElementById('vorge'));
    game.viewport.resize({ width: 1024, height: 576 });

    game.loop.start();

    console.log(game);
});
