module.exports = function spawn (id) {
    this.assets.download('shrek.gif').then(asset => asset.onload = () => {
        const keyboard = this.devices.find('keyboard');
        const std = this.libraries.use('std');
        const { texture, velocity } = std.components;
        const { render2d, move } = std.systems;
        const entity = this.initializer.heap.entities.get(id);

        texture.of(entity).data = asset;

        keyboard.subscribe('down').filter(() => [ 'w', 'd', 's', 'a' ].some(key => keyboard.key(key))).forEach(() => {
            if (keyboard.key('w')) velocity.of(entity).y = -1;
            if (keyboard.key('d')) velocity.of(entity).x = 1;
            if (keyboard.key('s')) velocity.of(entity).y = 1;
            if (keyboard.key('a')) velocity.of(entity).x = -1;

            this.tasks.create('amend', { id, components: { velocity: velocity.of(entity) } });
        });

        keyboard.subscribe('up').filter(() => [ 'w', 'd', 's', 'a' ].some(key => !keyboard.key(key))).forEach(() => {
            if (!keyboard.key('w') && !keyboard.key('s')) velocity.of(entity).y = 0;
            if (!keyboard.key('d') && !keyboard.key('a')) velocity.of(entity).x = 0;

            this.tasks.create('amend', { id, components: { velocity: velocity.of(entity) } });
        });

        this.loop.subscribe('update').forEach(() => {
            move.run(entity, this);
        });

        this.loop.subscribe('draw').forEach(() => {
            render2d.run(entity, this);
        });
    });
};
