const Documentation = require('scribe/core/Documentation');

const Game = require('../../core/Game');

module.exports = new Documentation(Game, 'vorge/core/Game', spec => {
    spec.section('title', `
        content
    `);
});
