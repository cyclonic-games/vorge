import Map from 'std/Map';
import window from 'std/dom/window';

import Plugin from 'vorge/core/Plugin';

import position from '../components/position';

import move from '../systems/move';
import render from '../systems/render';

export default new Plugin('common', game => {

    game.settings.save('viewport', new Map([
        [ 'width', 1024 ],
        [ 'height', 576 ],
        [ 'ratio', window.devicePixelRatio ]
    ]));

    game.on('loop:update', event => {
        for (const chunk of game.world.chunks) {
            animate.run(entity);
        }

        for (const entity of [ game.world.player, ...game.world.entities ]) {
            move.run(entity);
        }
    });

    game.on('loop:paint', event => {
        const entities = [ ...game.world.chunks, ...game.world.entities, game.world.player ];

        for (const entity of entities) {
            render.run(entity);
        }
    });
});
