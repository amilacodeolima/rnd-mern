var express = require('express');
const { v4: uuidv4 } = require('uuid');
const { DUMMY_PRODUCT_LIST } = require('../dummy/dummy-products');
var router = express.Router();
var Products = require('../models/products')

// List Products 
router.get('/', async (req, res, next) => {
  
    try{
        const productList = await Products.find({}).exec()
        return res.status(200).json(productList)
    }catch(e){
        res.status(500).json()
    }

});

// Product Get By Id 
router.get('/:id', async (req, res, next) => {
    
    try{
        const _id = req.params.id;
        const product = await Products.findOne({_id : _id }).exec()        
        if(product){
            return res.status(200).json(product)
        }else{
            return res.status(404).json()
        }
    }catch(err){
        return res.status(500).json()
    }

});

// Create Product
router.post('/', async (req, res, next) => {
    
    try{
        const { name, price } = req.body;
        if(name && price){
            const newProduct = new Products({ name, price })
            await newProduct.save()
            // TODO : if product already exsist in db should return 409 
            return res.status(200).json(newProduct)
        }else{
            return res.status(400).json()
        }
    }catch(err){
        return res.status(500).json(err)
    }

});

// Product Update by Id 

// Delete Product by Id
router.delete('/:id', function(req, res, next) {
    
    try{
        const id = req.params.id;
        // Start : Should replace by Actual DB Query 
        const product = DUMMY_PRODUCT_LIST.find((item) => item._id === id)
        // End 
        if(product){
            // Start : Should replace by Actual DB Query 
            const index = DUMMY_PRODUCT_LIST.findIndex((item) => item._id === product._id)
            DUMMY_PRODUCT_LIST.splice(index, 1)
            // End 
            return res.status(200).json()
        }else{
            return res.status(404).json()
        }
    }catch(err){
        return res.status(500).json()
    }

});



module.exports = router;