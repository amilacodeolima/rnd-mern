var express = require('express');
var router = express.Router();
var Products = require('../models/products')

// List Products 
router.get('/', async (req, res, next) => {
  
    // TODO : Pagination, page = 1, limit = 10 ( default values )
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

// Com Method
/**
 * 
 * @param {*} reqPayload 
 * @param {*} validationConfig 
 * @returns Array
 */
const validateRequestPayload = (reqPayload = {}, validationConfig = []) => {

    const isError = [];
    // const name = reqPayload.name
    // const price = reqPayload.price 
    // if(!name) {
    //     isError = isError + `Name is Required`
    // }
    // if(!price){
    //     isError = isError + `Price is Required`
    // }
    const vConfigLength =  validationConfig.length;
    for(let i  = 0; i < vConfigLength; i++){
        const key = validationConfig[i]
        const isKeyFound = reqPayload[key];
        if(!isKeyFound){
            isError.push({
                key, 
                error: `${key} is Required`
            })
        }
    }
    return isError;
}

// Create Product
router.post('/', async (req, res, next) => {
    
    // req.params eg : /products/:id = /products/1234 ->    id = req.params.id     =>  id = 1234
    // req.query  eg : /products?page=1 ->                  page = req.query.page  => page = 1
    // req.body   eg : { name : 'abc'} ->                   name = req.body.name   => name = "abc"

    try{
        const { name, price } = req.body;
        // TODO : Use lib for paylod validation
        const validationConfig = ["name", "price"];
        const isError = validateRequestPayload(req.body, validationConfig)
        if(!isError.length){
            const newProduct = new Products({ name, price })
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
router.put('/:id', async (req, res, next) => {
    
    // req.params eg : /products/:id = /products/1234 ->    id = req.params.id     =>  id = 1234
    // req.query  eg : /products?page=1 ->                  page = req.query.page  => page = 1
    // req.body   eg : { name : 'abc'} ->                   name = req.body.name   => name = "abc"

    try{
        const id = req.params.id
        const { name, price } = req.body;
        if(name && price && !isNaN(price)){
            const product = await Products.findOne({_id : id }).exec() 
            if(product){
                const updateProduct = await Products.findOneAndUpdate({ _id: id }, { name, price }, { new: true } )
                // TODO : if product already exsist in db should return 409 
                return res.status(200).json(updateProduct)
            }else{
                return res.status(404).json()
            }
        }else{
            return res.status(400).json()
        }
    }catch(err){
        return res.status(500).json()
    }

});

// Delete Product by Id
router.delete('/:id', async (req, res, next) => {
    
    try{
        const id = req.params.id;
        const product = await Products.findOne({_id : _id }).exec() 
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