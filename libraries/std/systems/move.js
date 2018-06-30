const System = require('../../../core/System');

const id = require('../components/id');
const position = require('../components/position');
const velocity = require('../components/velocity');

let now = Date.now();

module.exports = new System('move', [ id, position, velocity ], (entity, game) => {
    const p = position.of(entity);
    const v = velocity.of(entity);

    const pixels = 48;
    const second = 1000;
    const delta = (Date.now() - game.loop.time) / second;
    const distance = pixels * delta;

    p.x += distance * (v.x || 0);
    p.y += distance * (v.y || 0);
    p.z += distance * (v.z || 0);
});
