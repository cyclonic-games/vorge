const Module = require('../core/Module');

module.exports = class TaskManager extends Module {

    connect (game) {
        game.connection.subscribe('message').forEach(method => this.execute(...method.arguments));
    }

    execute (message) {
        const { task, origin = this.game.connection.id } = message;

        if (task) {
            this.emit(task.name, [ task.details, origin ]);
        }
    }

    create (name, details, origin = this.game.connection.id) {
        return this.game.connection.send({ task: { name, details }, origin }, origin);
    }
}
