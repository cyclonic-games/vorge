module.exports = function amend (meta) {
    const std = this.libraries.use('std');
    const { velocity } = std.components;
    const entity = this.initializer.heap.entities.get(meta.id);

    Object.assign(velocity.of(entity), meta.components.velocity);
}
