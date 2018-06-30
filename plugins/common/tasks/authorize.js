module.exports = function authorize () {
    this.tasks.create('provision', this.connection.id);
    this.tasks.create('peer', this.connection.id);
};
