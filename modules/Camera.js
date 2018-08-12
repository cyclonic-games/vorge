const Module = require('quantum/core/Module');

module.exports = class Camera extends Module {

    constructor (host) {
        super(host);

        this.target = null;
        this.x = 0;
        this.y = 0;
    }

    follow (entity) {
        this.target = entity;
    }

    update () {
        // TODO prevent camera from leaving bounds of edge chunks https://github.com/ndugger/vorge/blob/master/src/camera/index.js
        this.x = this.target.x + (this.target.width / 2) - (this[ Module.host ].settings.get('viewport.width') / 2);
        this.y = this.target.y + (this.target.height / 2) - (this[ Module.host ].settings.get('viewport.height') / 2);
    }
}
