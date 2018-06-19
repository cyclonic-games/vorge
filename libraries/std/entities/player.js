import Entity from 'ceres/core/Entity';

import experience from '../components/experience';
import health from '../components/health';
import input from '../components/input';
import name from '../components/name';
import position from '../components/position';
import texture from '../components/texture';

export default new Entity('player', [
    experience,
    health,
    input,
    name,
    position,
    texture
]);
