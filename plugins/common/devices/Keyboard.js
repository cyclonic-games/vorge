const Event = require('../../../core/Event');

module.exports = class Keyboard extends Event.Emitter {

    constructor (name) {
        super(name);

        this.keys = { };
        this.modifiers = { };
    }

    connect () {
        window.addEventListener('keydown', event => this.down(event));
        window.addEventListener('keyup', event => this.up(event));
    }

    down (event) {
        const { keys, modifiers } = this;
        const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
        const normalized = key.length === 1 ? key.toUpperCase() : key;

        if (keys[ normalized.trim() || 'Space' ]) {
            return;
        }

        keys[ normalized.trim() || 'Space' ] = true;
        modifiers.alt = altKey;
        modifiers.ctrl = ctrlKey;
        modifiers.meta = metaKey;
        modifiers.shift = shiftKey;

        this.emit('down', [ event ]);
    }

    up (event) {
        const { keys, modifiers } = this;
        const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
        const normalized = key.length === 1 ? key.toUpperCase() : key;

        if (!keys[ normalized.trim() || 'Space' ]) {
            return;
        }

        keys[ normalized.trim() || 'Space' ] = false;
        modifiers.alt = altKey;
        modifiers.ctrl = ctrlKey;
        modifiers.meta = metaKey;
        modifiers.shift = shiftKey;

        this.emit('up', [ event ]);
    }
}
