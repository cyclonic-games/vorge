const Mock = require('socrates/core/Mock');
const Specification = require('socrates/core/Specification');
const Spy = require('socrates/core/Spy');

const Game = require('../../core/Game');

const Connection = require('../../modules/Connection');

module.exports = new Specification('Connection', test => {
    const game = new Mock(Game);
    const connection = new Connection('connection', game);

    connection.connect(game);

    test.case('foo', () => {
        const spy = new Spy();
        test.expect(text.called(spy).with('bar'));
    });
});
