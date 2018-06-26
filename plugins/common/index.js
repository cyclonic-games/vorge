const Plugin = require('../../core/Plugin');

const Gamepad = require('./devices/Gamepad');
const Keyboard = require('./devices/Keyboard');
const Mouse = require('./devices/Mouse');

const fragment = require('./shaders/default/fragment');
const vertex = require('./shaders/default/vertex');

const gamepad = new Gamepad('gamepad');
const keyboard = new Keyboard('keyboard');
const mouse = new Mouse('mouse');

module.exports = new Plugin('common', game => {
    const std = game.libraries.use('std');

    game.devices.install(gamepad);
    game.devices.install(keyboard);
    game.devices.install(mouse);

    game.renderer.subscribe('attach').forEach(() => {
        game.renderer.bind('default', [ fragment, vertex ]);
    });

    game.connection.subscribe('ready').forEach(() => {
        game.tasks.create('authenticate', [ 'admin', '1234' ]);
    });

    game.tasks.subscribe('authorize').forEach(() => {
        game.tasks.create('provision', game.connection.id);
        game.assets.download('shrek.gif').then(asset => {
            asset.onload = () => {
                const player = std.entities.player.create({
                    position: {
                        x: 100,
                        y: 100
                    },
                    size: {
                        width: 64,
                        height: 64
                    },
                    texture: {
                        data: asset
                    }
                });

                game.loop.subscribe('draw').forEach(() => {
                    std.systems.render2d.run(player, game);
                });
            }
        });
    });

    game.viewport.mount(document.getElementById('vorge'));
    game.viewport.resize({ width: 1024, height: 576 });

    game.loop.start();
});
