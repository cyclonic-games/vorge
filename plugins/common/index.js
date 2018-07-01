const Plugin = require('../../core/Plugin');

const Gamepad = require('./devices/Gamepad');
const Keyboard = require('./devices/Keyboard');
const Mouse = require('./devices/Mouse');

const fragment = require('./shaders/default/fragment');
const vertex = require('./shaders/default/vertex');

const amend = require('./tasks/amend');
const authorize = require('./tasks/authorize');
const handshake = require('./tasks/handshake');
const spawn = require('./tasks/spawn');

module.exports = new Plugin('common', game => {
    const std = game.libraries.use('std');

    game.devices.install(new Gamepad('gamepad'));
    game.devices.install(new Keyboard('keyboard'));
    game.devices.install(new Mouse('mouse'));

    game.tasks.subscribe('handshake').forEach(method => handshake.apply(game, method.arguments));
    game.tasks.subscribe('authorize').forEach(method => authorize.apply(game, method.arguments));
    game.tasks.subscribe('spawn').forEach(method => spawn.apply(game, method.arguments));
    game.tasks.subscribe('amend').forEach(method => amend.apply(game, method.arguments));

    game.viewport.subscribe('mount').forEach(() => {
        game.renderer.bind('default', [ fragment, vertex ]);
    });

    game.loop.subscribe('update').forEach(() => {
        std.systems.move.run(game.initializer.heap.entities.get(game.world.player), game);

        for (const id of game.world.entities) {
            std.systems.move.run(game.initializer.heap.entities.get(id), game);
        }
    });

    game.loop.subscribe('draw').forEach(() => {
        game.renderer.clear();
        game.renderer.fill();

        std.systems.render2d.run(game.initializer.heap.entities.get(game.world.player), game);

        for (const id of game.world.entities) {
            std.systems.render2d.run(game.initializer.heap.entities.get(id), game);
        }
    });

    Object.assign(window, { game });
});
