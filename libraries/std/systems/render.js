import System from 'ceres/core/System';

import position from '../components/position';
import texture from '../components/texture';

export default new System('render', [ position, texture ], entity => {
    const { x, y, z } = position.of(entity);
    const { data, mask } = texture.of(entity);

    game.renderer.render({ data, x, y, z, mask });
});
