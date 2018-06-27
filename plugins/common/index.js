const Plugin = require('../../core/Plugin');

const Gamepad = require('./devices/Gamepad');
const Keyboard = require('./devices/Keyboard');
const Mouse = require('./devices/Mouse');

const fragment = require('./shaders/default/fragment');
const vertex = require('./shaders/default/vertex');

const authorize = require('./tasks/authorize');
const handshake = require('./tasks/handshake');
const spawn = require('./tasks/spawn');

const gamepad = new Gamepad('gamepad');
const keyboard = new Keyboard('keyboard');
const mouse = new Mouse('mouse');

module.exports = new Plugin('common', game => {
    game.devices.install(gamepad);
    game.devices.install(keyboard);
    game.devices.install(mouse);

    game.tasks.subscribe('handshake').forEach(method => handshake.apply(game, method.arguments));
    game.tasks.subscribe('authorize').forEach(method => authorize.apply(game, method.arguments));
    game.tasks.subscribe('spawn').forEach(method => spawn.apply(game, method.arguments));

    game.viewport.mount(document.getElementById('vorge'), { width: 1024, height: 576 });
    game.renderer.bind('default', [ fragment, vertex ]);
    game.loop.start();
});
