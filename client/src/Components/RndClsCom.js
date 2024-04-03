import React, { Component } from 'react'
import axios from 'axios'

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
            <div>Loading ....</div> : 
            <div>{this.state.products.map((item) => <div key={item._id}>Name : {item.name}, Price: {item.price}</div> )}</div>
        }        
      </>
    )
  }
}