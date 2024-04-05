const mongoose = require('mongoose')

const schema = new mongoose.Schema({ 
    name: { type : String, required: true }, 
    price: { type : Number, required: true }, 
    desc: { type : String, required: false, default: '' }
},{ timestamps: true });

const Products = mongoose.model('Products', schema);

module.exports = Products;