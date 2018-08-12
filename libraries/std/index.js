const Library = require('../../core/Library');

const id = require('./components/id');
const position = require('./components/position');
const size = require('./components/size');
const texture = require('./components/texture');
const velocity = require('./components/velocity');

const player = require('./entities/player');

const example = require('./macros/example');

const move = require('./systems/move');
const render2d = require('./systems/render2d');

module.exports = new Library('std', {
    components: [
        id,
        position,
        size,
        texture,
        velocity
    ],
    entities: [
        player
    ],
    macros: [
        example
    ],
    systems: [
        move,
        render2d
    ]
});
