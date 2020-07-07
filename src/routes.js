const express = require('express');

const jwt = require('./jwt/signin');

const authMiddleware = require('./Middlewares/auth');

const routes = express.Router();

routes.post('/auth', (req, res) => {

    const token = jwt({ id: admin.id });

    return res.json({ token });
});

routes.get('/users', authMiddleware, (req, res) => {

    const users = await knex('user').select('*');

    return res.json({ users });

});