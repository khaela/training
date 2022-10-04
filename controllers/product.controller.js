const ProductService = require('../services/product.service');

class ProductController {
    async getAllProductByStoreID () {
        let response = await ProductService.getAllProductByStoreID();
        return response;
    }

    async getAllProductsByStoreInfo() {
        let response = await ProductService.getAllProductsByStoreInfo();
        return response;
    }

    //GET
    async  getAllProducts(requestObject) {
        let offset = (requestObject.offset != null || requestObject.offset != undefined ? parseInt(requestObject.offset) : 0);
        let limit = (requestObject.limit != null || requestObject.limit != undefined ? parseInt(requestObject.limit) : 5);
        let sort = (requestObject.sort != null || requestObject.sort != undefined ? requestObject.sort : 'id');
        let order = (requestObject.order != null || requestObject.order != undefined ? requestObject.order : 'ASC');
        let response = await ProductService.getAllProducts(offset, limit, sort, order);
        return response;
        
        
    }



    async getOneProduct () {
        let response = await StoreService.getOneProduct();
        return response;
    }

    async createProduct (requestObject) {
        let response = await StoreService.createProduct(requestObject);
        return response;
    }

    async updateProduct (requestObject) {
        let response = await StoreService.updateProduct(requestObject);
        return response;
    }

    async deleteStore (requestObject) {
        let response = await StoreService.deleteStore(requestObject);
        return response;
    }
   


}
module.exports = new ProductController;