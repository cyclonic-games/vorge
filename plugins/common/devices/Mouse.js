const Event = require('quantum/core/Event');

module.exports = class Mouse extends Event.Emitter {

    constructor (name) {
        super(name);

        this.buttons = { };
        this.modifiers = { };
        this.position = { };
    }

    connect () {
        window.addEventListener('mousedown', event => this.down(event));
        window.addEventListener('mouseup', event => this.up(event));
    }

    down (event) {
        const { buttons, modifiers, position } = this;
        const { button, altKey, ctrlKey, metaKey, shiftKey, offsetX, offsetY } = event;

        if (buttons[ button ]) {
            return;
        }

        buttons[ button ] = true;
        modifiers.alt = altKey;
        modifiers.ctrl = ctrlKey;
        modifiers.meta = metaKey;
        modifiers.shift = shiftKey;
        position.x = offsetX;
        position.y = offsetY;

        this.emit('down', [ event ]);
    }

    up (event) {
        const { buttons, modifiers, position } = this;
        const { button, altKey, ctrlKey, metaKey, shiftKey, offsetX, offsetY } = event;

        if (!buttons[ button ]) {
            return;
        }

        buttons[ button ] = false;
        modifiers.alt = altKey;
        modifiers.ctrl = ctrlKey;
        modifiers.meta = metaKey;
        modifiers.shift = shiftKey;
        position.x = offsetX;
        position.y = offsetY;

        this.emit('up', [ event ]);
    }
}
