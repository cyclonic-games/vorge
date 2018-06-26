const Entity = require('../../../core/Entity');

const experience = require('../components/experience');
const health = require('../components/health');
const id = require('../components/id');
const name = require('../components/name');
const position = require('../components/position');
const size = require('../components/size');
const texture = require('../components/texture');

module.exports = new Entity('player', [
    experience,
    health,
    id,
    name,
    position,
    size,
    texture
]);
