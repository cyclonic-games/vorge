const { Renderer, Shader } = require('picasso');

const instances = new Set();

module.exports = class WebGL extends Renderer {

    constructor (canvas) {
        super(canvas);
        instances.add(this);
    }

    extend (fn) {

    }
}

module.exports.Shader = Shader;

Object.defineProperty(module.exports, '__instances__', {
     get () {
        return instances.values();
    }
});
