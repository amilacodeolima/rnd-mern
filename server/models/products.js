const mongoose = require('mongoose')

const schema = new mongoose.Schema({ 
    name: String, 
    price: Number, 
});

const Products = mongoose.model('Products', schema);

module.exports = Products;