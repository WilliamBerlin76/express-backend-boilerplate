const db = require('../config/db-config');

module.exports = {
    get,
    getById,
    add
}

function get() {
    return db ('users')
        .select('id', 'username', 'email', 'created_at', 'updated_at');
};

function getById(id) {
    return db('users')
        .where({ id })
        .select('id', 'username', 'email', 'created_at', 'updated_at')
        .first()
};

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => getById(id));
};