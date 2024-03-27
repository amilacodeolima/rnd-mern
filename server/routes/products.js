var express = require('express');
const { DUMMY_PRODUCT_LIST } = require('../dummy/dummy-products');
var router = express.Router();

// List Products 
router.get('/', function(req, res, next) {
  
    const products = DUMMY_PRODUCT_LIST
    return res.status(200).json(products)

});

// Product Get By Id 
router.get('/:id', function(req, res, next) {
    
    try{
        const id = req.params.id;
        const product = DUMMY_PRODUCT_LIST.find((item) => item._id === id)
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

// Product Update by Id 

// Delete Product


module.exports = router;