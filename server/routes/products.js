var express = require('express');
const { DUMMY_PRODUCT_LIST } = require('../dummy/dummy-products');
var router = express.Router();

// List Products 
router.get('/', function(req, res, next) {
  
    return res.status(200).json(DUMMY_PRODUCT_LIST)

});

// TODO :
// Product Get By Id 

// Create Product

// Product Update by Id 

// Delete Product


module.exports = router;