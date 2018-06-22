const Library = require('../core/Library');
const Module = require('../core/Module');

module.exports = class LibraryManager extends Module {
    
    constructor (name, game) {
        super(name, game);
        
        this.collection = new Set();
    }
    
    install (lib) {
        if (lib instanceof Library) this.collection.add(lib);
        else throw new TypeError('Invalid Library');
    }
    
    use (name) {
        return Array.from(this.collection).find(lib => lib.kind === name);
    }
}
