const Module = require('quantum/core/Module');

const devices = new Set();

module.exports = class DeviceManager extends Module {

    install (device) {
        device.connect(this[ Module.host ]);
        devices.add(device);
    }

    find (name) {
        return Array.from(devices).find(device => device.kind === name);
    }
}
