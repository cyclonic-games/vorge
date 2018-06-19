import System from 'ceres/core/System';

import input from '../components/input';
import position from '../components/position';

export default new System('move', [ input, position ], entity => {
    const { controls } = input.of(entity);
    const { x, y } = position.of(entity);

    let newX = x;
    let newY = y;

    if (engine.keyboard.get(controls.up) || engine.gamepad.get(controls.up)) {
        newY -= 1;
    }

    if (engine.keyboard.get(controls.right) || engine.gamepad.get(controls.right)) {
        newX += 1;
    }

    if (engine.keyboard.get(controls.down) || engine.gamepad.get(controls.down)) {
        newY += 1;
    }

    if (engine.keyboard.get(controls.left) || engine.gamepad.get(controls.left)) {
        newX -= 1;
    }

    position.update(entity, { x: newX, y: newY });
});
