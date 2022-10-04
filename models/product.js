const Sequelize = require('sequelize');
const config = require('../config/config');
const store = require('../models/store');


const product = config.define('Store', {
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    
    },

    price: {
        type: Sequelize.STRING,
        allowNull: true
    },

    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    }

});

store.hasMany(product, {
    foreignKey: 'store_id',
    as: 'product_items'
});

product.belongsTo(store, {
    foreignKey: 'store_id',
    as: 'store_info'
});



module.exports =  product;