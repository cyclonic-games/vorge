const Module = require('../core/Module');

module.exports = class Connection extends Module {

    constructor (name, game) {
        super(name, game);

        this.host = null;
        this.id = null;
        this.socket = null;
    }

    connect (game) {
        game.subscribe('play').forEach(method => this.establish(...method.arguments));
        game.subscribe('quit').forEach(method => this.disconnect(...method.arguments));
        game.tasks.subscribe('handshake').forEach(method => this.ready(...method.arguments));
    }

    establish (host) {
        this.host = host;
        this.socket = new WebSocket(`ws://${ host }`);
        this.socket.onmessage = event => this.emit('message', [ JSON.parse(event.data) ]);
        this.socket.onerror = error => this.disconnect(error);
    }

    ready (id) {
        this.id = id;
    }

    disconnect (reason) {
        this.socket.close();
    }

    send (id, message) {
        this.socket.send(JSON.stringify(message));
    }

    fetch (path, options = { }) {
        return fetch(`http://${ this.host }/${ path }`, Object.assign(options, {
            headers: Object.assign(options.headers || { }, {
                authorization: `connection ${ this.id }`
            })
        }));
    }
}
