var express = require('express');
var router = express.Router();
var Products = require('../models/products')
var { validateRequestPayload } = require('../util/validateRequestPayload')

// List Products 
router.get('/', async (req, res, next) => {
  
    // TODO : Pagination, page = 1, limit = 10 ( default values )
        const { page = 1, limit = 10 } = req.query 
        try{
        const productList = await Products.find({}).skip((page - 1) * limit).limit(limit).sort({_id : -1 }).exec()
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
const validationConfigCreateObj = [
   { key: "name", type: "string", isRequired: true },
   { key: "price", type: "number", isRequired: true },
   { key: "desc", type: "string", isRequired: false }
];
router.post('/', async (req, res, next) => {
    
    // req.params eg : /products/:id = /products/1234 ->    id = req.params.id     =>  id = 1234
    // req.query  eg : /products?page=1 ->                  page = req.query.page  => page = 1
    // req.body   eg : { name : 'abc'} ->                   name = req.body.name   => name = "abc"

    try{
    
        // TODO : Use lib for paylod validation
        const isError = validateRequestPayload(req.body, validationConfigCreateObj)
        if(!isError.length){
            const newProduct = new Products(req.body)
            await newProduct.save()
            // TODO : if product already exsist in db should return 409 
            return res.status(200).json(newProduct)
        }else{
            return res.status(400).json(isError)
        }
    }catch(err){
        return res.status(500).json()
    }

});

// Product Update by Id 
const validationConfigUpdateObj = [
    { key: "name", type: "string", isRequired: false },
    { key: "price", type: "number", isRequired: false },
    { key: "desc", type: "string", isRequired: false }
 ];
router.put('/:id', async (req, res, next) => {
    
    // req.params eg : /products/:id = /products/1234 ->    id = req.params.id     =>  id = 1234
    // req.query  eg : /products?page=1 ->                  page = req.query.page  => page = 1
    // req.body   eg : { name : 'abc'} ->                   name = req.body.name   => name = "abc"

    try{
        const id = req.params.id
        const isError = validateRequestPayload(req.body, validationConfigUpdateObj)
        if(!isError.length){
            const product = await Products.findOne({_id : id }).exec() 
            if(product){                
                const updateProduct = await Products.findOneAndUpdate({ _id: id }, req.body, { new: true } )
                // TODO : if product already exsist in db should return 409 
                return res.status(200).json(updateProduct)
            }else{
                return res.status(404).json()
            }
        }else{
            return res.status(400).json(isError)
        }
    }catch(err){
        return res.status(500).json()
    }

});

// Delete Product by Id
router.delete('/:id', async (req, res, next) => {
    
    try{
        const id = req.params.id;
        const product = await Products.findOne({_id : id }).exec() 
        if(product){
            await Products.deleteOne({ _id : product._id })
            return res.status(200).json()
        }else{
            return res.status(404).json()
        }
    }catch(err){
        return res.status(500).json()
    }

});



module.exports = router;