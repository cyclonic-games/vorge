const plugins = new Set();

module.exports = class Plugin {

    constructor (name, patch = () => { }) {
        this.applied = false;
        this.kind = name;
        this.patches = [ patch ];
    }

    patch (game) {
        this.patches.forEach(patch => patch(game));
        this.applied = true;
    }

    extend (patch) {
        this.patches.push(patch);
    }
}

Object.defineProperty(module.exports, '__instances__', {
    get () {
        return store.get('systems').values();
    }
});
