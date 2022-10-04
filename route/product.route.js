const express = require('express');
const StoreController = require('../controllers/store.controller');
const StoreRouter = express.Router();
const ProductRouter = express.Router();
const AuthService = require ('../services/auth.service');

//Store-ID
ProductRouter.get('/get-all-products-by-store/:id'), async (req,res) => {
    let authenticate = await AuthService.verifyToken(req.headers['authorization']);
    if(authenticate.status == 200) {
    let response = await ProductController.getAllProductByStoreID();
    return res.status(response.status).send(response);
} else {
    return res.status(authenticate.status).send(authenticate);
}
};


//Get-info
ProductRouter.get('/get-all-products-by-info/:id'), async (req,res) => {
    let response = await ProductController.getAllProductsByStoreInfo(parseInt(req.params.id));
    return res.status(response.status).send(response);
}


//Getall-products
ProductRouter.get('/get-all-products'), async (req,res) => {
    let response = await ProductController.getAllProduct(req.query);
    return res.status(response.status).send(response);
}


module.exports = ProductRouter;