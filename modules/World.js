const Module = require('../core/Module');

const state = new Map();

module.exports = class World extends Module {

    get player () {
        return state.get('player');
    }

    get entities () {
        return state.get('entities');
    }

    get chunks () {
        return state.get('chunks');
    }

    set chunks (chunks) {
        return state.set('chunks', chunks);
    }

    connect (game) {
        game.subscribe('entity', 'join').forEach(method => this.greet(method.arguments[ 0 ]));
        game.subscribe('entity', 'update').forEach(method => this.amend(method.arguments[ 0 ]));
        game.subscribe('entity', 'leave').forEach(method => this.forget(method.arguments[ 0 ]));
        game.player.subscribe('live').forEach(method => this.begin(method.arguments[ 0 ]));
        game.player.subscribe('die').forEach(method => this.end(method.arguments[ 0 ]));
        game.player.subscribe('travel').forEach(method => this.navigate(method.arguments[ 0 ]));
    }

    begin (parameters) {

    }

    end (statistics) {

    }

    navigate (direction) {
        const { chunks, origin } = direction;
        const {
            NORTH_WEST, NORTH, NORTH_EAST,
            WEST, ORIGIN, EAST,
            SOUTH_WEST, SOUTH, SOUTH_EAST
        } = World.compass;

        switch (direction.origin) { // TODO add other 4 cases
            case NORTH: {
                this.chunks = [
                    chunks[ 0 ], chunks[ 1 ], chunks[ 2 ],
                    this.chunks[ NORTH_WEST ], this.chunks[ NORTH ], this.chunks[ NORTH_EAST ],
                    this.chunks[ WEST ], this.chunks[ ORIGIN ], this.chunks[ EAST ]
                ];
                break;
            }
            case EAST: {
                this.chunks = [
                    this.chunks[ NORTH ], this.chunks[ NORTH_EAST ], chunks[ 0 ],
                    this.chunks[ ORIGIN ], this.chunks[ EAST ], chunks[ 1 ],
                    this.chunks[ SOUTH ], this.chunks[ SOUTH_EAST ], chunks[ 2 ]
                ];
                break;
            }
            case SOUTH: {
                this.chunks = [
                    this.chunks[ WEST ], this.chunks[ ORIGIN ], this.chunks[ EAST ],
                    this.chunks[ SOUTH_WEST ], this.chunks[ SOUTH ], this.chunks[ SOUTH_EAST ],
                    chunks[ 0 ], chunks[ 1 ], chunks[ 2 ]
                ];
                break;
            }
            case WEST: {
                this.chunks = [
                    chunks[ 0 ], this.chunks[ NORTH_WEST ], this.chunks[ NORTH ],
                    chunks[ 1 ], this.chunks[ WEST ], this.chunks[ ORIGIN ],
                    chunks[ 2 ], this.chunks[ SOUTH_WEST ], this.chunks[ SOUTH ]
                ];
                break;
            }
        }
    }

    greet (entities) {

    }

    amend (entities) {

    }

    forget (entities) {

    }
}

module.exports.compass = Object.freeze({
    NORTH_WEST: 0, NORTH: 1, NORTH_EAST: 2,
    WEST: 3, ORIGIN: 4, EAST: 5,
    SOUTH_WEST: 6, SOUTH: 7, SOUTH_EAST: 8
});
