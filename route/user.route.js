const express = require('express');
const userControllers = require('../controllers/user.controllers');
const StoreController = require('../controllers/user.controllers');
const StoreRouter = express.Router();
const UserRouter = express.Router();

UserRouter.post('/user-login', (req, res) => {
    let response =  userControllers.login(req.body);
    return res.status(response.status).send(response);
});

UserRouter.post('/user-signup', (req, res) => {
    let response =  userControllers.signup(req.body);
    return res.status(response.status).send(response);
});




module.exports = UserRouter;