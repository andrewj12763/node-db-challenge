const express = require('express');

const ProjectRouter = require('./projects/projects-router').router;
const ActionRouter = require('./actions/actions-router');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/actions', ActionRouter);

module.exports = server;