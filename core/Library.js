module.exports = class Library {

    constructor (name, lib) {
        this.kind = name;

        this.components = { };
        this.entities = { };
        this.systems = { };

        for (const component of lib.components) {
            this.components[ component.kind ] = component;
        }

        for (const entity of lib.entities) {
            this.entities[ entity.kind ] = entity;
        }

        for (const system of lib.systems) {
            this.systems[ system.kind ] = system;
        }
    }

    catalogue (game) {
        for (const system of Object.values(this.systems)) {
            system.bind(game);
        }

        return this;
    }
};
