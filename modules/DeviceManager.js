const Module = require('../core/Module');

const devices = new Set();

module.exports = class DeviceManager extends Module {

    install (device) {
        device.connect(this.game);
        devices.add(device);
    }

    find (name) {
        return Array.from(devices).find(device => device.kind === name);
    }
}
