const express = require('express');
const StoreController = require('../controllers/store.controller');
const StoreRouter = express.Router();
const AuthService = require ('../services/auth.service');


StoreRouter.get('/get-all-stores', async (req, res) => {
    let authenticate = await AuthService.verifyToken(req.headers['authorization']);
    if(authenticate.status == 200) {
        let response = await StoreController.getAllStore();
        return res.status(response.status).send(response);
    } else {
        return res.status(authenticate.status).send(authenticate);
    }
   
});

StoreRouter.post('/create-stores', async (req, res) => {
    let authenticate = await AuthService.verifyToken(req.headers['authorization']);
    if(authenticate.status == 200) {
        let response = await StoreController.createStore();
        return res.status(response.status).send(response);
    } else {
        return res.status(authenticate.status).send(authenticate);
    }
    });

StoreRouter.get('/get-by-id-store/:id', async (req, res) => {
    let authenticate = await AuthService.verifyToken(req.headers['authorization']);
    if(authenticate.status == 200) {
        let response = await StoreController.getOneStore();
        return res.status(response.status).send(response);
    } else {
        return res.status(authenticate.status).send(authenticate);
    }
        });

 StoreRouter.put('/update-store', async (req, res) => {
    let authenticate = await AuthService.verifyToken(req.headers['authorization']);
    if(authenticate.status == 200) {
        let response = await StoreController.updateStore();
        return res.status(response.status).send(response);
    } else {
        return res.status(authenticate.status).send(authenticate);
    }
            });

 StoreRouter.delete('/delete-one-store/:id', async (req, res) => {
                let response = await StoreController.deleteStore(parseInt(req.params.id));
                return res.status(response.status).send(response);
                });
        
 StoreRouter.delete('/delete-store', async (req, res) => {
                    let response = await StoreController.deleteStore(req.body);
                    return res.status(response.status).send(response);
                    });

module.exports = StoreRouter;