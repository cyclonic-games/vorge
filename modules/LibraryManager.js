const Library = require('../core/Library');
const Module = require('../core/Module');

const std = require('../libraries/std');

module.exports = class LibraryManager extends Module {

    constructor (name, game) {
        super(name, game);

        this.collection = new Set();

        this.enable(std);
    }

    enable (lib) {
        if (lib instanceof Library) {
            this.collection.add(lib.catalogue(this.game));
        }
        else {
            throw new TypeError('Invalid Library');
        }
    }

    use (name) {
        const lib = Array.from(this.collection).find(lib => lib.kind === name);

        if (!lib) {
            console.warn(`Missing library: ${ name }`);
        }

        return lib;
    }
}
