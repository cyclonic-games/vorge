const Module = require('../core/Module');

module.exports = class TaskManager extends Module {

    connect (game) {
        game.connection.subscribe('message').forEach(method => this.execute(...method.arguments));
    }

    execute (message) {
        const { origin, task } = message;

        if (task) {
            this.emit(task.name, [ origin, task ]);
        }
    }

    create (name, details, id = this.game.connection.id) {
        return this.game.connection.send({ origin: id, task: { name, details } }, id);
    }
}
