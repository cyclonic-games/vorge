const Library = require('../core/Library');
const Module = require('../core/Module');

const std = require('../libraries/std');

module.exports = class LibraryManager extends Module {

    constructor (name, game) {
        super(name, game);

        this.collection = new Map();

        this.enable(std);
    }

    enable (lib) {
        if (lib instanceof Library) {
            this.collection.set(lib.kind, lib);
        }
        else {
            throw new TypeError('Invalid Library');
        }
    }

    use (name) {
        const lib = this.collection.get(name);

        if (!lib) {
            console.warn(`Missing library: ${ name }`);
        }

        return lib;
    }
}
