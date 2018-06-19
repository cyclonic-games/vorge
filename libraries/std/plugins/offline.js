const Game = require('vorge/core/Game');
const Module = require('vorge/core/Module');
const Plugin = require('vorge/core/Plugin');

Game.connection = class Connection extends Module {

};

module.exports new Plugin('offline', game => {
    // single-player plugin
});
