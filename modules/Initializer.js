const Component = require('../core/Component');
const Entity = require('../core/Entity');
const Module = require('../core/Module');
const System = require('../core/System');

module.exports = class Initializer extends Module {

    constructor (name, game) {
        super(name, game);

        this.heap = Object.freeze({
            entities: new Map(),
            scripts: new Map()
        });
    }

    connect (game) {
        game.connection.subscribe('close').forEach(method => this.delete(...method.arguments));
        game.tasks.subscribe('initialize').forEach(method => this.initialize(...method.arguments));
        game.tasks.subscribe('runScript').forEach(method => this.run(...method.arguments));
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
            'target',
            'game',
            Component.name,
            Entity.name,
            System.name
        ];

        this.heap.scripts.set(script.name, new Function(...args, script.code));
    }

    spawn (id, entity) {
        const kind = Array.from(Entity.__instances__).find(x => x.kind === entity.kind);
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
