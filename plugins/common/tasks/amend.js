module.exports = function amend (meta, id) {
    const std = this.libraries.use('std');
    const entity = this.initializer.heap.entities.get(id);

    for (const [ key, value ] of  Object.entries(meta.components)) {
        Object.assign(std.components[ key ].of(entity), value);
    }
}
