const Library = require('../../core/Library');

const position = require('./components/position');
const texture = require('./components/texture');

const player = require('./entities/player');

const move = require('./systems/move');
const render = require('./systems/render');

module.exports = new Library('std', {
    components: [
        position,
        texture
    ],
    entities: [
        player
    ],
    systems: [
        move,
        render
    ]
});
