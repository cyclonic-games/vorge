const Module = require('../core/Module');

module.exports = class TaskManager extends Module {

    connect (game) {
        game.connection.subscribe('message').forEach(method => this.execute(...method.arguments));
    }

    execute (message) {
        const { origin, task = { } } = message;
        this.emit(task.name || 'unknown', [ origin, task ]);
    }
}
