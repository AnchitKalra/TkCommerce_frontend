import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './products.css'
 import ListItem from '../ListItem/ListItem';

function GetProducts() {
    let i = 0;
    let [products, setProducts] = useState([
        {
            key : 1,
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
                rate: 3.9,
                count: 120
            }
        }]);
        let[flag, setFlag] = useState(false);

        
        useEffect(function getProducts() {
            try{
           async function getProds() {
         let response = await axios.get("http://192.168.1.5:4000/products/getProducts");
         const responseItems = response.data.data;
         let transformedData =  responseItems.map((item) => {
            return({...item, key : item.id});
        }
        );
         console.log('looging transformedData');
         console.log(transformedData);
         setProducts(products = [...transformedData]);
         console.log('logging Products');
         console.log(products);
         setFlag(true);
    }
    getProds();
}catch(error) {
        console.log(error);
    }
        },[]);




        
        const element = (<div id = "big_div">
        <div className = "fourt">
        <div className='listDiv'>
         <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
         <ListItem data = {products[i++]}></ListItem>
        </div>
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        </div>
        <div className = "fourt">
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        </div>
        <div className = "fourt">
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        </div>
        <div className = "fourt">
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        </div>
        <div className = "fourt">
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
         </div>
         <div className='listDiv'>
        <ListItem data = {products[i++]}></ListItem>
        </div>
        </div>
  </div>);
  if(flag) {
    if(products?.length > 1) {
        return element;
    }
  }
  else {
    return "";
  }
}
export default GetProducts;
   