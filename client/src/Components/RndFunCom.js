import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './Product';
import Loading from './Loading';

const RndFunCom =  () => {

    const [isLoading, setIsloading] = useState(true);
    const [products, setProducts] = useState([])

    useEffect(() => {

        axios.get( `${process.env.REACT_APP_API_URL}/products`)
          .then((response) => {
            setProducts(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // always executed
            setIsloading(false)
          });
    }, [])

  return (
    <>
    {isLoading ? 
            <Loading /> : 
            <div>{products.map((item) => <Product key={item._id} name={item.name} price={item.price} /> )}</div>
        }  
    </>
  )
}

export default RndFunCom