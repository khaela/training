const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const Response = require('../utils/response.utils');
const Store = require('../model/store');
const { OK_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE } = require ('../utils/response_message.utils');
const {OK, CREATED, UPDATE, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR} = require ('../utils/response.utils');
const { product } = require('./db.context');

class ProductService extends Response {

    async getAllProductsByStoreID () {
       try {
        let exist = await Store.findAll( {imclude: {model: product,
        as:'product_items',
        attributes: { exclude: ['createdAt', 'updatedAt']}}, 
          attributes: { exclude: ['createdAt', 'updatedAt']}});
        if (exist.length !=0) {
            return this.RESPONSE(OK, exist, OK_MESSAGE);
        } else {
            return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
        }

       } catch{
        return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
       }

}

//GET PRODUCT ID With INFO

async getAllProductsByStoreInfo (productID) {
    try {
        let exist = await product.findOne({where: { id: productID}, include: [{model: Store, as: store_info}]});
        if (exist != null) {
            return this.RESPONSE(OK, exist, OK_MESSAGE);
        } else {
            return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
        }

       } catch{
        return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
       }
}

    async getAllProducts (offset, limit, sort, order) {
        try {
            //ASC DESC
            let exist = await product.findAll({offset: offset, limit: limit, order:[[sort, order]]})
            if (exist.length !=0) {
                return this.RESPONSE(OK, exist, OK_MESSAGE);

            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
            }
        }
     catch (err) {
        return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
    
    }

    }

}
module.exports = new ProductService;