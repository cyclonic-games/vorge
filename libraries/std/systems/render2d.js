const System = require('../../../core/System');

const position = require('../components/position');
const size = require('../components/size');
const texture = require('../components/texture');

module.exports = new System('render2d', [ position, size, texture ], (entity, game) => {
    const { x, y } = position.of(entity);
    const { width, height } = size.of(entity);
    const { data } = texture.of(entity);

    game.renderer.uniform('vorge_Texture', data);

    game.renderer.input('vorge_Sample', new Float32Array([
        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1
    ]));

    game.renderer.input('vorge_Position', new Float32Array([
        x, y,
        x + width, y,
        x, y + height,
        x, y + height,
        x + width, y,
        x + width, y + height
    ]));

    game.renderer.draw(6);
});
