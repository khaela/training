const dotenv = require('dotenv').config();
const store = require ('../models/store');
const user = require ('../models/user');
const product = require ('../models/product');


module.exports = { store, product, user }