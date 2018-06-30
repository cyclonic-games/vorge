const System = require('../../../core/System');

const position = require('../components/position');
const velocity = require('../components/velocity');

module.exports = new System('move', [ position, velocity ], (entity, game) => {
    const p = position.of(entity);
    const { x = 0, y = 0, z = 0 } = velocity.of(entity);

    p.x += x;
    p.y += y;
    p.z += z;
});
