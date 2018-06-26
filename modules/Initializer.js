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
        game.tasks.subscribe('initialize').forEach(method => this.initialize(...method.arguments));
        game.tasks.subscribe('runScript').forEach(method => this.run(...method.arguments));
    }

    initialize (object) {
        switch (object.type) {
            case 'entity': {
                return this.spawn(object.spec);
            }
            case 'script': {
                return this.compile(object.spec);
            }
        }
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

    spawn (entity) {
        const kind = Array.from(Entity.__instances__).find(x => x.kind === entity.kind);
        const spawned = kind.create(entity.components);

        this.heap.entities.set(entity.id, spawned);

        if (entity.script) {
            this.heap.scripts.get(entity.script).call(spawned, this.game, Component, Entity, System);
        }
    }

    run (script) {
        const target = this.heap.entities.get(script.target);

        this.heap.scripts.get(script.name)(target, this.game, Component, Entity, System);
    }
}
