const Module = require('../core/Module');

module.exports = class Loop extends Module {

    constructor (name, game) {
        super(name, game);

        this.running = false;
        this.time = Date.now();
    }

    start () {
        this.running = true;

        this.update(0);
        this.draw(0);
    }

    pause () {
        this.running = false;
    }

    update (frame = 0) {
        if (this.running) setTimeout(() => {
            this.update(++frame % 60);
            this.time = Date.now();
        }, 1000 / 60);
    }

    draw (frame = 0) {
        if (this.running) requestAnimationFrame(() => {
            this.draw(++frame % 60);
        });
    }
}
