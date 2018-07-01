const Module = require('../core/Module');
const WebGL = require('../core/WebGL');

const blank = document.createElement('canvas');
blank.width = 16;
blank.height = 16;

const blankContext = blank.getContext('2d');
blankContext.fillStyle = '#FFFFFF';
blankContext.fillRect(0, 0, 16, 16)
blankContext.fillStyle = '#D3D4D6';
blankContext.fillRect(0, 0, 8, 8);
blankContext.fillRect(8, 8, 8, 8);

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

    fill () {
        const x = 0;
        const y = 0;
        const width = this.webgl.canvas.width;
        const height = this.webgl.canvas.height;

        this.webgl.uniform('vorge_Texture', blank);

        this.webgl.context.texParameteri(this.webgl.context.TEXTURE_2D, this.webgl.context.TEXTURE_MAG_FILTER, this.webgl.context.NEAREST);
        this.webgl.context.texParameteri(this.webgl.context.TEXTURE_2D, this.webgl.context.TEXTURE_WRAP_S, this.webgl.context.REPEAT);
        this.webgl.context.texParameteri(this.webgl.context.TEXTURE_2D, this.webgl.context.TEXTURE_WRAP_T, this.webgl.context.REPEAT);

        this.webgl.input('vorge_Sample', new Float32Array([
            0, 0,
            width / blank.width, 0,
            0, height / blank.height,
            0, height / blank.height,
            width / blank.width, 0,
            width / blank.width, height / blank.height
        ]));

        this.webgl.input('vorge_Position', new Float32Array([
            (x | 0), (y | 0),
            (x | 0) + width, (y | 0),
            (x | 0), (y | 0) + height,
            (x | 0), (y | 0) + height,
            (x | 0) + width, (y | 0),
            (x | 0) + width, (y | 0) + height
        ]));

        this.webgl.draw(6);
    }

    draw (n) {
        this.webgl.draw(n);
    }

    paint () {
        // TODO paint in-memory canvas to viewport-canvas -- performance?
    }
};
