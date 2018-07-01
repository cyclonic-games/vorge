const blank = document.createElement('canvas');
blank.width = 16;
blank.height = 16;
blank.getContext('2d').fillStyle = '#FFFFFF';
blank.getContext('2d').fillRect(0, 0, 16, 16)
blank.getContext('2d').fillStyle = '#D3D4D6';
blank.getContext('2d').fillRect(0, 0, 8, 8);
blank.getContext('2d').fillRect(8, 8, 8, 8);

module.exports = {

    fill (webgl, texture = blank) {
        const x = 0;
        const y = 0;
        const width = webgl.canvas.width;
        const height = webgl.canvas.height;

        webgl.uniform('vorge_Texture', texture);

        webgl.context.texParameteri(webgl.context.TEXTURE_2D, webgl.context.TEXTURE_MAG_FILTER, webgl.context.NEAREST);
        webgl.context.texParameteri(webgl.context.TEXTURE_2D, webgl.context.TEXTURE_WRAP_S, webgl.context.REPEAT);
        webgl.context.texParameteri(webgl.context.TEXTURE_2D, webgl.context.TEXTURE_WRAP_T, webgl.context.REPEAT);

        webgl.input('vorge_Sample', new Float32Array([
            0, 0,
            width / texture.width, 0,
            0, height / texture.height,
            0, height / texture.height,
            width / texture.width, 0,
            width / texture.width, height / texture.height
        ]));

        webgl.input('vorge_Position', new Float32Array([
            (x | 0), (y | 0),
            (x | 0) + width, (y | 0),
            (x | 0), (y | 0) + height,
            (x | 0), (y | 0) + height,
            (x | 0) + width, (y | 0),
            (x | 0) + width, (y | 0) + height
        ]));

        webgl.draw(6);
    }
};
