const Module = require('../core/Module');

const saved = new Map();

module.exports = class Settings extends Module {

    get (key) {
        const keys = key.split('.');

        return keys.reduce((settings, key) => {
            if (settings && settings.has(key)) {
                return settings.get(key);
            }
            return settings;
        }, saved);
    }

    set (key, value) {
        const keys = key.split('.');

        return keys.reduce((settings, key, index) => {
            if (index < keys.length - 1) {
                if (settings.has(key)) {
                    return settings.get(key);
                }
                else {
                    settings.set(key, new Map());
                    return settings.get(key);
                }
            }
            else {
                return settings.set(key, value);
            }
        }, saved);
    }
}
