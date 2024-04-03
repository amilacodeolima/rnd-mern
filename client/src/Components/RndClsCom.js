import React, { Component } from 'react'
import axios from 'axios'
import Product from './Product';
import Loading from './Loading';

export default class RndClsCom extends Component {

    constructor(props) { 
        super(props); 
        // Initializing the state  
        this.state = { isLoading: true, products: [] }; 
      } 

      componentDidMount() {
        axios.get( `${process.env.REACT_APP_API_URL}/products`)
          .then((response) => {
            this.setState({
                isLoading: false,
                products: response.data
            });
          })
          .catch((error) => {
            console.log(error);
            this.setState({
                isLoading: false,
                products: []
            });
          })
          .finally(() => {
            // always executed
          });
    }
    

  render() {
    return (
      <>        
        {this.state.isLoading ? 
            <Loading /> : 
            <div>{this.state.products.map((item) => <Product key={item._id} name={item.name} price={item.price} /> )}</div>
        }        
      </>
    )
  }
}