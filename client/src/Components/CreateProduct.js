import React, { useState } from 'react'
import { createProducts } from '../Services/apiService'

const CreateProduct = () => {

    const [product, setProduct] = useState({name: '', price: 0, desc: ''})
    const [errors, setErrors] = useState({})

    const handleSumbit = (e) => {
        e.preventDefault()
        if(validateForm()){            
            createProducts(product)
              .then((response) => {                
                setProduct({name: '', price: 0, desc: ''})
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                // always executed            
              });   
        }
    }
    
    const validateForm = () => {

        let tempErros = {}
        tempErros.name = product.name ? '' : 'Name field is required.'
        tempErros.price = product.price > 0 ? '' : 'Pirce must be greater than zero.'
        tempErros.desc = '';

        setErrors({...tempErros})
        return Object.values(tempErros).every((x) => x === '');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name] : value })

    }

    return (
        <>
            <form onSubmit={handleSumbit}>
                <div >
                    <label htmlFor='name'>Name:</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}                        
                    />
                    <div style={{color:"red"}}>{errors.name}</div>
                </div>
                <div >
                    <label htmlFor='price'>Price:</label>
                    <input 
                        type='number'
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}                        
                    />
                    <div style={{color:"red"}}>{errors.price}</div>
                </div>
                <div>
                <label htmlFor='desc'>Desc (optional):</label>
                    <input 
                        type="text"
                        id="desc"
                        name="desc"
                        value={product.desc}  
                        onChange={handleChange}                      
                    />
                    <div style={{color:"red"}}>{errors.desc}</div>
                </div>
                <button type="submit">Creaet Product</button>
            </form>
        </>
    )
}

export default CreateProduct;