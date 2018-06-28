module.exports = function authorize () {
    this.tasks.create('provision', this.connection.id);
};
