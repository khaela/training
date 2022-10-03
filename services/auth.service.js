const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const Response = require('../utils/response.utils');
const { OK_MESSAGE, 
    CREATED_MESSAGE, 
    UPDATE_MESSAGE, 
    NOTFOUND_MESSAGE, 
    BADREQUEST_MESSAGE, 
    INTERNAL_SERVER_ERROR_MESSAGE } = require ('../utils/response_message.utils');
const {OK, CREATED, UPDATE, NOTFOUND, BADREQUEST, INTERNAL_SERVER_ERROR} = require ('../utils/response.utils');

 class AuthService extends Response{
    async auth (requestObject) {
        try {
            let authentication = jwt.sign(requestObject, process.env.SECRET_KEY);
            if (authentication != null) {
                return this.RESPONSE(OK, { accessToken: authentication }, OK_MESSAGE);
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST);
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    // Verify:
    async verify (token) {
        try {
            if (token != null || token != undefined) {
                var getToken = token.split(' ')[1];

                if (getToken != null || getToken != undefined) {
                    
                    let verification = await jwt.verify(getToken, process.env.SECRET_KEY);
                    if (verification != null) {
                        return this.RESPONSE(OK, verification, OK_MESSAGE);
                    } else {
                        return this.RESPONSE(BADREQUEST, {}, BADREQUEST);
                    }

                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
                }

            } else {
                return this.RESPONSE(BADREQUEST, {}, "");
            }
        } catch (err) {
            console.log(err);
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

 }

 module.exports = new AuthService;