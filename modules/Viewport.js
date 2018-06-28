const Module = require('../core/Module');

module.exports = class Viewport extends Module {

    constructor (name, game) {
        super(name, game);

        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'block';
        this.ratio = window.devicePixelRatio;
    }

    mount (container) {
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;

        container.appendChild(this.canvas);
    }

    resize (screen = { }) {
        const {
            width = this.canvas.width,
            height = this.canvas.height,
            ratio = this.ratio
        } = screen;

        this.ratio = ratio;
        this.canvas.width = width;
        this.canvas.height = height;
    }
}
