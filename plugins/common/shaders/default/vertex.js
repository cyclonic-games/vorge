const WebGL = require('../../../../core/WebGL');

module.exports = new WebGL.Shader('vertex', `
    uniform vec2 vorge_Resolution;
    in vec2 vorge_Position;
    in vec2 vorge_Sample;

    out vec2 vertex_Sample;

    void main () {
        vec2 one = vorge_Position / vorge_Resolution;
        vec2 two = one * 2.0;
        vec2 clip = two - 1.0;
        vec2 flip = vec2(1.0, -1.0);

        gl_Position = vec4(clip * flip, 0.0, 1.0);
        vertex_Sample = vorge_Sample;
    }
`);
