const Module = require('quantum/core/Module');

module.exports = class Player extends Module {

    constructor (host) {
        super(host);

        this[ 0 ] = null;
        this[ 1 ] = null;
        this[ 2 ] = null;
        this[ 3 ] = null;
    }
}
