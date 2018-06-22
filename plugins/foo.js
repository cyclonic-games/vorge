const Plugin = require('../core/Plugin');

module.exports = new Plugin('foo', game => {
    const std = game.library.use('std');
    
    const player = std.entities.player.create({
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    });
});
