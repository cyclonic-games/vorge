const Module = require('../core/Module');

module.exports = class Connection extends Module {

    constructor (name, game) {
        super(name, game);

        this.socket = null;
    }

    connect (game) {
        game.subscribe('play').forEach(method => this.establish(method.arguments[ 0 ]));
        game.subscribe('quit').forEach(method => this.disconnect(method.arguments[ 0 ]));
    }

    establish (host) {
        this.socket = new WebSocket(`ws://${ host }`);
        this.socket.onmessage = event => this.emit('message', [ JSON.parse(event.data) ]);
        this.socket.onerror = error => this.disconnect(error);
    }

    disconnect (reason) {
        this.socket.close();
    }

    send (task) {
        this.socket.send(JSON.stringify(task));
    }
}
