const db = require('../data/dbConfig');

module.exports = {
    find,
    findAction,
    insertAction,
    updateAction,
    removeAction
}

function find() {
    return db('actions');
}

function findAction(id) {
    return db('actions')
        .where({ id: Number(id) })
        .then(ids => ids[0]);
}

function insertAction(action, id) {
    const actionWithProj = {...action, project_id: Number(id)};
    return db('actions')
        .insert(actionWithProj)
        .then(ids => findAction(ids[0]));
}

function updateAction(fields, id) {
    return db('actions')
        .where({ id: Number(id) })
        .update(fields)
        .then(() => findAction(id));
}

async function removeAction(id) {
    const act = await findAction(id);
    return db('actions')
        .where({ id: Number(id) })
        .del()
        .then(() => act);
}