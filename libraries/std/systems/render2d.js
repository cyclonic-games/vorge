const System = require('../../../core/System');

const position = require('../components/position');
const texture = require('../components/texture');

module.exports = new System('render2d', [ position, texture ], (game, entity) => {
    const { x, y, z } = position.of(entity);
    const { data, mask } = texture.of(entity);

    game.renderer.render({ data, x, y, z, mask });
});
