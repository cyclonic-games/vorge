const Module = require('quantum/core/Module');

module.exports = class Connection extends Module {

    constructor (host) {
        super(host);

        this.address = null;
        this.id = null;
        this.socket = null;
    }

    connect () {
        this[ Module.host ].subscribe('play').forEach(method => this.establish(...method.arguments));
        this[ Module.host ].subscribe('quit').forEach(method => this.disconnect(...method.arguments));
        this[ Module.host ].tasks.subscribe('handshake').forEach(method => this.ready(...method.arguments));
    }

    establish (address) {
        this.address = address;
        this.socket = new WebSocket(`ws://${ address }`);
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
        return fetch(`http://${ this.address }/${ path }`, Object.assign(options, {
            headers: Object.assign(options.headers || { }, {
                authorization: `connection ${ this.id }`
            })
        }));
    }
}
