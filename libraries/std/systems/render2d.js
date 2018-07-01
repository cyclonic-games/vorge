const System = require('../../../core/System');

const position = require('../components/position');
const size = require('../components/size');
const texture = require('../components/texture');

module.exports = new System('render2d', [ position, size, texture ], (entity, game) => {
    const { webgl } = game.renderer;
    const { x, y } = position.of(entity);
    const { width, height } = size.of(entity);
    const { data } = texture.of(entity);

    webgl.context.blendFunc(webgl.context.SRC_ALPHA, webgl.context.ONE_MINUS_SRC_ALPHA);
    webgl.context.enable(webgl.context.BLEND);

    webgl.uniform('vorge_Texture', data);

    webgl.context.texParameteri(webgl.context.TEXTURE_2D, webgl.context.TEXTURE_MAG_FILTER, webgl.context.NEAREST);

    webgl.input('vorge_Sample', new Float32Array([
        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1
    ]));

    webgl.input('vorge_Position', new Float32Array([
        (x | 0), (y | 0),
        (x | 0) + width, (y | 0),
        (x | 0), (y | 0) + height,
        (x | 0), (y | 0) + height,
        (x | 0) + width, (y | 0),
        (x | 0) + width, (y | 0) + height
    ]));

    webgl.draw(6);
});
