let time = 0;

function ping (timeout) {

    if (this.loop.time > time) {
        this.tasks.create('ping', Date.now());
        time = Date.now() + timeout;
    }

    setTimeout(() => ping.call(this, timeout), timeout);
}

module.exports = function handshake () {
    this.tasks.create('authenticate', [ 'admin', '1234' ]);
    time = Date.now();
    ping.call(this, 1000 * 5);
};
