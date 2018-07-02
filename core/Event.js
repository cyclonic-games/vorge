module.exports = class Event {

    constructor (type, when, args, target) {
        this.type = type;
        this.when = when;
        this.arguments = args;
        this.target = target;
    }

    clone () {
        return new this.constructor(this.type, this.when, this.arguments, this.target);
    }
};

module.exports.Emitter = class EventEmitter {

    constructor (name) {
        this.kind = name;
        this.observables = new Map([ ]);
    }

    connect (game) {

    }

    emit (mod, method, data) {
        const target = !data ? this : mod;
        const property = !data ? mod : method;
        const payload = !data ? method : data;
        const when = new Date();
        const event = new module.exports(property, when, payload, target);
        const methods = this.observables.get(target);

        if (methods && methods.has(property)) {
            methods.get(property).forEach(observable => observable.pipe(event));
        }

        return event;
    }

    subscribe (mod, method) {
        const target = !method ? this : mod;
        const property = !method ? mod : method;
        const observable = new module.exports.Observable();

        if (this.observables.has(target) && this.observables.get(target).has(property)) {
            this.observables.get(target).get(property).push(observable);
        }
        else if (this.observables.has(target)) {
            this.observables.get(target).set(property, [ observable ]);
        }
        else {
            this.observables.set(target, new Map([ [ property, [ observable ] ] ]));
        }

        return observable;
    }

    unsubscribe (observable) {
        for (const [ target, subscriptions ] of this.observables) {
            for (const [ property, observables ] of subscriptions) {
                for (const o of observables) if (o === observable) {
                    return observables.splice(observables.indexOf(o), 1)[ 0 ];
                }
            }
        }
    }
};

module.exports.Observable = class EventObservable {

    constructor () {
        this.actions = new Set();
        this.stream = new Set();
    }

    debounce (fn) {
        this.actions.add([ 'debounce', fn ])
        return this;
    }

    filter (fn) {
        this.actions.add([ 'filter', fn ])
        return this;
    }

    forEach (fn) {
        this.actions.add([ 'forEach', fn ])
        return this;
    }

    map (fn) {
        this.actions.add([ 'map', fn ])
        return this;
    }

    pipe (event) {
        this.stream.add(event.clone());

        for (const [ action, fn ] of this.actions) switch (action) {
            case 'debounce': {
                console.error('debounce is not yet supported');
                continue;
                // need to pipe back in at current location in actions
                // return setTimeout(() => {
                //     const last = new Set([ Array.from(this.stream).pop() ];
                //
                //     this.stream.clear();
                //     this.pipe(last);
                // }, fn());
            }
            case 'filter': {
                this.stream = new Set(Array.from(this.stream).filter(fn));
                continue;
            }
            case 'map': {
                this.stream = new Set(Array.from(this.stream).map(fn));
                continue;
            }
            case 'forEach': {
                this.stream.forEach(fn);
                continue;
            }
        }

        this.stream.clear();
    }
};
