const WebGL = require('../../../../../../core/WebGL');

module.exports = new WebGL.Shader('fragment', `
    precision mediump float;

    uniform sampler2D vorge_Texture;
    in vec2 vertex_Sample;

    out vec4 fragment_Color;

    void main () {
        fragment_Color = texture(vorge_Texture, vertex_Sample);
    }
`);
