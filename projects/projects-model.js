const db = require('../data/dbConfig');
module.exports = {
    find,
    findById,
    getProjectActions,
    getProjectWithActions,
    insert,
    remove,
    update,
}

function find() {
    return db('projects');
}

function findById(id) {
    return db('projects')
        .where({ id: Number(id) })
        .then(ids => ids[0]);
}

function getProjectActions(id) {
    return db('actions')
        .select(['id', 'description', 'notes', 'completed'])
        .where({ project_id: Number(id) });
}

async function getProjectWithActions(id) {
    const proj = await findById(id);
    proj.actions = await getProjectActions(id);
    return proj;
}

function insert(proj) {
    return db('projects')
        .insert(proj)
        .then(ids => findById(ids[0]));
}

async function remove(id) {
    const proj = await findById(id);
    return db('projects')
        .where({ id: Number(id) })
        .del()
        .then(() => proj);
}

function update(fields, id) {
    return db('projects')
        .where({ id: Number(id) })
        .update(fields)
        .then(() => findById(id));
}