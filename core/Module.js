const Event = require('./Event');

const modules = new Map();

module.exports = new Proxy(class Module extends Event.Emitter {

    constructor (name, host, key = 'game') {
        super(name);

        this[ key ] = host;
    }
}, {

    construct (parent, args, child) {
        return new Proxy(Reflect.construct(parent, args, child), {

            get (module, property, proxy) {
                const observables = Reflect.get(module, 'observables');

                if (observables.has(proxy) && observables.get(proxy).has(property)) {

                    if (modules.has(module) && modules.get(module).has(property)) {
                        return modules.get(module).get(property);
                    }

                    const method = new Proxy(Reflect.get(module, property), {

                        apply (method, context, args) {
                            const result = Reflect.apply(method, context, args);
                            const emit = Reflect.get(module, 'emit');

                            Reflect.apply(emit, proxy, [ property, args ]);

                            return result;
                        }
                    });

                    if (modules.has(module)) {
                        modules.get(module).set(property, method);
                    }
                    else {
                        modules.set(module, new Map([ [ property, method ] ]));
                    }

                    return modules.get(module).get(property);
                }

                return Reflect.get(module, property);
            }
        });
    }
});
