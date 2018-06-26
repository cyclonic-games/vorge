const System = require('../../../core/System');

const position = require('../components/position');
const texture = require('../components/texture');

module.exports = new System('render2d', [ position, texture ], (entity, game) => {
    const { x, y, z } = position.of(entity);
    const { data, mask } = texture.of(entity);

    game.renderer.input('vorge_Foo', new Float32Array([ 1, 2 ]));
});
