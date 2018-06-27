module.exports = function spawn (id) {
    this.assets.download('shrek.gif').then(asset => asset.onload = () => {
        const std = this.libraries.use('std');
        const { texture } = std.components;
        const { render2d } = std.systems;
        const entity = this.initializer.heap.entities.get(id);

        texture.of(entity).data = asset;

        render2d.run(entity, this);
    });
};
