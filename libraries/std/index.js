const Library = require('../../core/Library');

const position = require('./components/position');
const size = require('./components/size');
const texture = require('./components/texture');

const player = require('./entities/player');

const render2d = require('./systems/render2d');

module.exports = new Library('std', {
    components: [
        position,
        texture
    ],
    entities: [
        player
    ],
    systems: [
        render2d
    ]
});
