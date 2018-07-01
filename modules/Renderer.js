const Module = require('../core/Module');
const WebGL = require('../core/WebGL');

module.exports = class Renderer extends Module {

    constructor (name, game) {
        super(name, game);

        this.dimensions = 2;
        this.webgl = null;
        this.layers = [ ];
    }

    connect (game) {
        game.viewport.subscribe('mount').forEach(method => this.attach(...method.arguments));
        game.viewport.subscribe('resize').forEach(method => this.adjust(...method.arguments));
    }

    attach () {
        this.webgl = new WebGL(this.game.viewport.canvas);
    }

    bind (name, shaders) {

        if (name in this.webgl.programs) {
            return this.webgl.useProgram(name);
        }

        this.webgl.initialize(name, ...shaders);

        this.adjust();
    }

    adjust () {
        const { width, height } = this.game.viewport.canvas;

        this.webgl.viewport(0, 0, width, height);
        this.webgl.uniform('vorge_Resolution', new Float32Array([ width, height ]));
    }

    input (name, value) {
        this.webgl.input(name, value);
    }

    uniform (name, value) {
        this.webgl.uniform(name, value);
    }

    dimensionalize (n) {
        this.dimensions = n;
    }

    clear () {
        this.webgl.clear(0, 0, 0, 0);
    }

    draw (n) {
        this.webgl.draw(n);
    }

    paint () {
        // TODO paint in-memory canvas to viewport-canvas -- performance?
    }
};
