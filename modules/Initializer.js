const Module = require('quantum/core/Module');

const Component = require('../core/Component');
const Entity = require('../core/Entity');
const System = require('../core/System');

const TARGET = `TARGET_${ Math.round(Math.random() * Date.now()) }`;

module.exports = class Initializer extends Module {

    constructor (host) {
        super(host);

        this.heap = Object.freeze({
            entities: new Map(),
            scripts: new Map()
        });
    }

    connect () {
        this[ Module.host ].connection.subscribe('close').forEach(method => this.delete(...method.arguments));
        this[ Module.host ].tasks.subscribe('initialize').forEach(method => this.initialize(...method.arguments));
        this[ Module.host ].tasks.subscribe('runScript').forEach(method => this.run(...method.arguments));
    }

    initialize (object, ...args) {
        switch (object.type) {
            case 'entity': {
                return this.spawn(...args, object.spec);
            }
            case 'script': {
                return this.compile(...args, object.spec);
            }
        }
    }

    delete (id) {
        this.heap.entities.delete(id);
    }

    compile (script) {
        const args = [
            TARGET,
            'game',
            Component.name,
            Entity.name,
            System.name
        ];

        this.heap.scripts.set(script.name, new Function(...args, `(async () => {
            ${ script.code };
            // ================================
            main(${ TARGET });
        })()`));
    }

    spawn (id, entity) {
        const kind = Array.from(Entity.kinds).find(x => x.kind === entity.kind);
        const spawned = kind.create(entity.components);

        this.heap.entities.set(id, spawned);

        if (entity.script) {
            this.heap.scripts.get(entity.script)(spawned, this.game, Component, Entity, System);
        }

        return spawned;
    }

    run (script) {
        const target = this.heap.entities.get(script.target);
        const fn = this.heap.scripts.get(script.name);

        fn(target, this.game, Component, Entity, System);

        return fn;
    }
}
