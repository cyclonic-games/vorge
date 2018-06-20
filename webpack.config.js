const path = require('path');

module.exports = {
    mode: 'none',
    entry: [
        path.join(__dirname, '_', 'entry.js')
    ],
    output: {
        path: path.join(__dirname, '_'),
        filename: 'output.js'
    },
    module: {
        rules: [
            {
                test: /\.js/
            }
        ]
    }
};
