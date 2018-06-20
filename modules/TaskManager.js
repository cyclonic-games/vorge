const Module = require('../core/Module');

module.exports = class TaskManager extends Module {

    connect (game) {
        game.connection.subscribe('message').forEach(method => this.execute(method.arguments[ 0 ]));
    }

    execute (tasks) {
        for (const task of tasks) {
            this.emit(task.name, [ task.details ]);
        }
    }
}
