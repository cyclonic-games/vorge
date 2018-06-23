const Entity = require('../../../core/Entity');

const experience = require('../components/experience');
const health = require('../components/health');
// import input from '../components/input';
const name = require('../components/name');
const position = require('../components/position');
const texture = require('../components/texture');

module.exports = new Entity('player', [
    experience,
    health,
    // input,
    name,
    position,
    texture
]);
