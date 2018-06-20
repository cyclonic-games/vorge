const Component = require('../core/Component');
const Entity = require('../core/Entity');
const Module = require('../core/Module');
const System = require('../core/System');

const scripts = new Map();

module.exports = class Initializer extends Module {

    get heap () {
        return {
            entities: Array.from(Entity.__instances__),
            scripts: Array.from(scripts.values())
        }
    }

    connect (game) {
        game.subscribe('script', 'compile').forEach(method => this.compile(method.arguments[ 0 ]));
        game.subscribe('script', 'run').forEach(method => this.run(method.arguments[ 0 ]));
        game.subscribe('entity', 'spawn').forEach(method => this.spawn(method.arguments[ 0 ]));
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

    run (name, target) {
        this.heap.scripts.get(name).call(target, this.game, Component, Entity, System);
    }

    spawn (entity) {
        const kind = this.heap.entities.find(x => x.kind === entity.kind);
        const spawned = kind.create(entity.components);

        if (entity.script) {
            this.heap.scripts.get(entity.script).call(spawned, this.game, Component, Entity, System);
        }
    }
}
