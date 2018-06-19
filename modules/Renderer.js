const Module = require('vorge/core/Module');
const WebGL = require('vorge/core/WebGL');

const blank = document.createElement('canvas');
blank.width = 1;
blank.height = 1;

const blankContext = blank.getContext('2d');
blankContext.fillStyle = '#D3D4D6';
blankContext.fillRect(0, 0, 1, 1);

module.exports = class Renderer extends Module {

    constructor (name, game) {
        super(name, game);

        this.dimensions = 2;
        this.engine = null;
        this.layers = [ ];
    }

    connect (game) {
        game.subscribe('entity', 'draw').forEach(method => this.draw(method.arguments[ 0 ]));
        game.loop.subscribe('draw').forEach(method => this.paint(method.arguments[ 0 ]));
        game.viewport.subscribe('mount').forEach(method => this.attach(method.arguments[ 0 ]));
        game.viewport.subscribe('resize').forEach(method => this.adjust(method.arguments[ 0 ]));
    }

    adjust () {
        this.engine.viewport(0, 0, this.game.viewport.canvas.width, this.game.viewport.canvas.height);
        this.engine.uniform('vorge_Resolution', new Float32Array([
            this.game.viewport.canvas.width,
            this.game.viewport.canvas.height
        ]));
    }

    attach () {
        this.engine = new WebGL(this.game.viewport.canvas);
    }

    bind (name, shaders) {

        if (name in this.engine.programs) {
            return this.engine.useProgram(name);
        }

        this.engine.initialize(name, ...shaders);
    }

    input (name, value) {
        this.engine.input(name, value);
    }

    uniform (name, value) {
        this.engine.uniform(name, value);
    }

    dimensionalize (n) {
        this.dimensions = n;
    }

    clear () {
        this.engine.clear();
    }

    draw (object) {
        switch (this.dimensions) {
            case 2: {
                const { size, position, texture } = object;

                this.engine.uniform('vorge_Texture', texture || blank);

                this.engine.input('vorge_Sample', new Float32Array([
                    0, 0,
                    1, 0,
                    0, 1,
                    0, 1,
                    1, 0,
                    1, 1
                ]));

                this.engine.input('vorge_Position', new Float32Array([
                    position.x, position.y,
                    position.x + size.width, position.y,
                    position.x, position.y + size.height,
                    position.x, position.y + size.height,
                    position.x + size.width, position.y,
                    position.x + size.width, position.y + size.height
                ]));

                this.engine.draw(6);

                break;
            }
            case 3: {
                break;
            }
        }
    }

    paint () {

    }
};
