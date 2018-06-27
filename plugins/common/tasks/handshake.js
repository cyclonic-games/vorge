module.exports = function handshake () {
    this.tasks.create('authenticate', [ 'admin', '1234' ]);
};
