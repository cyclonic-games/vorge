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
        game.tasks.subscribe('initialize').forEach(method => this.initialize(method.arguments[ 0 ]));
        game.tasks.subscribe('runScript').forEach(method => this.run(...method.arguments));
    }

    initialize (blueprints) {
        for (const plan of blueprints) switch (plan.kind) {
            case 'entity': {
                return this.spawn(plan.details);
            }
            case 'script': {
                return this.compile(plan.details);
            }
        }
    }

    compile (script) {
        const args = [
            this.game.constructor.name.toLowerCase(),
            Component.name,
            Entity.name,
            System.name
        ];

        this.heap.scripts.set(script.name, new Function(...args, script.code));
    }

    spawn (entity) {
        const kind = Array.from(Entitiy.__instances__).find(x => x.kind === entity.kind);
        const spawned = kind.create(entity.components);

        this.heap.entities.set(entitiy.id, spawned);

        if (entity.script) {
            this.heap.scripts.get(entity.script).call(spawned, this.game, Component, Entity, System);
        }
    }

    run (id, name) {
        const target = this.heap.entities.get(id);

        this.heap.scripts.get(name).call(target, this.game, Component, Entity, System);
    }
}
