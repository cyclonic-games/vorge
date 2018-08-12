const Component = require('./Component');

class Action {

    constructor (kind, inputs, output, fn) {
        this.kind = kind;
        this.inputs = inputs;
        this.output = output;
        this.fn = fn;
    }

    do (variables) {
        for (const [ key, value ] of Object.entries(variables)) {

            if (!Component.validate(this.inputs[ key ], value)) {
                const expected = this.inputs[ key ].name.toLowerCase();
                const actual = typeof value;

                throw new TypeError(`Wrong type for argument "${ key }": expected ${ expected }, found ${ actual }`);
            }
        }

        this.fn(variables);
    }
}

Action.extractor = /^(?:function[^]+?\()?(?:\(?(.+?))\)?(?:\)[^]?=>)?(?:=>)?[^]?{([^]+?)}$/;

module.exports = Action;
