const EnCoSy = require('encosy');

module.exports = class System extends EnCoSy.System {

    bind (game) {
        this.actions = this.actions.map(action => action.bind(undefined, game));
    }
};
