const express = require('express');

const ProjectsDB = require('../projects/projects-model');
const ActionsDB = require('./actions-model');
const validators = require('../projects/projects-router');

const router = express.Router();

async function validateAction(req, res, next) {
    if (req.params.id) {
        try {
            const act = await ActionsDB.findAction(req.params.id);
            if (!act) throw new Error('Action null');
            req.action = act;
            next();
        } catch (error) {
            res.status(404).json({ error: "Action id not valid" });
            return;
        }
    } else {
        next();
    }
}

router.put('/:id', validateAction, validators.validateNewAction, async (req,res) => {
    try {
        const act = await ActionsDB.updateAction(req.action, req.params.id);
        res.status(201).json(act);
    } catch (error) {
        res.status(500).json({ error: "Couldn't update action" });
    }
})

router.delete('/:id', validateAction, async (req,res) => {
    try {
        const act = await ActionsDB.removeAction(req.action.id);
        res.status(200).json(act);
    } catch (error) {
        res.status(500).json({ error: "Couldn't delete action" });
    }
})

router.get('/:id', validateAction, async (req, res) => {
    try {
        res.status(200).json(req.action);
    } catch (error) {
        res.status(500).json({ error: "Couldn't get action" });
    }
})

router.get('/', async (req, res) => {
    try {
        const actions = await ActionsDB.find();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ error: "Couldn't get actions" });
    }
})

module.exports = router;