var express = require('express');
const { v4: uuidv4 } = require('uuid');
const { DUMMY_PRODUCT_LIST } = require('../dummy/dummy-products');
var router = express.Router();

// List Products 
router.get('/', function(req, res, next) {
  
    try{
        // Start : Should replace by Actual DB Query 
        const products = DUMMY_PRODUCT_LIST
        // End
        return res.status(200).json(products)
    }catch(e){
        res.status(500).json()
    }

});

// Product Get By Id 
router.get('/:id', function(req, res, next) {
    
    try{
        const id = req.params.id;
        // Start : Should replace by Actual DB Query
        const product = DUMMY_PRODUCT_LIST.find((item) => item._id === id)
        // End
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
router.post('/', function(req, res, next) {
    
    try{
        const body = req.body;
        const name = body.name;
        const price = body.price;
        if(name && price){
            const newProduct = { name: body.name, price : body.price }
            // Start : Should replace by Actual DB Query
            const finalobj = { _id : uuidv4(), ...newProduct}
            DUMMY_PRODUCT_LIST.push(finalobj)
            const product =  finalobj;
            // End
            // TODO : if product already exsist in db should return 409 
            return res.status(200).json(product)
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