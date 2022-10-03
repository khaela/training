const Response = require('../utils/response.utils');
const Store = require ('../models/store');

class StoreService extends Response{


     //GET ALLSTORE
    async getAllStore () {
        try {
            let exist = await Store.findAll();
            if (exist.length !=0) {
                return this.RESPONSE(200, exist, "Succes");

            } else {
                return this.RESPONSE(404, [], "NO RECORDS");
            }


        } catch (err) {
            return this.RESPONSE(500, {}, "Internal Server Error");
        }
    }

    //Get
    async getOneStore () {
        try {
            let exist = await Store.findAll({ where: { id: requestObject}});
            if (exist.length !=0) {
                return this.RESPONSE(200, exist, "Succes");

            } else {
                return this.RESPONSE(404, [], "NO RECORDS");
            }


        } catch (err) {
            return this.RESPONSE(500, {}, "Internal Server Error");
        }
    }

    //Create Store
    async createStore (requestObject) {
        try {
            let exist = await Store.findOne({ where: { name: requestObject.name}});
            if (exist == null) {
            let createData = await Store.create(requestObject);
            if (createData !=null) {
                return this.RESPONSE(200, createData, "Success");
            }  else {
                return this.RESPONSE(400, {}, "Failed");
            }
         } else {
            return this.RESPONSE(200, exist, "Already Exist");
         }

        }  catch (err) {
            return this.RESPONSE(500, {}, "Internal Server");
        }
    }

    //Update
    async UpdateStor (requestObject) {
        try {
            let exist = await Store.findOne ({where: {id: requestObject}});
            if (exist != null) {
                let updateData = await Store.update(requestObject, {where: {id: requestObject}});
                if (updateData !=null) {
                    return this.RESPONSE(202, updateData, "Successfully");
                } else {
                    return this.RESPONSE(404, {}, "No record");
                }
            }
        } catch (err) {
            return this.RESPONSE(500, {}, "Internal");

        }
        }



    //DELETE
    async DeleteStore (requestObject) {
        try {
            let exist = await Store.findOne ({where: {id: requestObject}});
            if (exist != null) {
                let removeData = await Store.destroy(requestObject, {where: {id: requestObject}});
                if (removeData !=null) {
                    return this.RESPONSE(202, updateData, "Successfully");
                } else {
                    return this.RESPONSE(404, {}, "Failed");
                }
            } else {
                return this.RESPONSE(404, {}, "No record");
            }
        } catch (err) {
            return this.RESPONSE(500, {}, "Internal");

        }
        }
    }




        
module.exports = new StoreService;
