import React, {useEffect, useState} from 'react'

import axios from 'axios';
import './products.css'
import ListItem from '../ListItem/ListItem';
import Header from '../header/Header';



function GetProducts({isLoggedIn}) {
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

        

useEffect(() =>{

            getProds()}, [isLoggedIn]);



      
           async function getProds() {
            try {
               //loginWithToken();
         let response = await axios.get("http://localhost:4000/products/getProducts", {withCredentials: true});
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
    }
    catch(err) {
        console.log(err);
    }
    }

      

    if(products?.length > 1) {
        return (
            <>
            <Header></Header>
            <div id = "big_div">
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
</div>
<div className = "fourt">
<div className='listDiv'>
<ListItem data = {products[i++]}></ListItem>
 </div>
 <div className='listDiv'>
<ListItem data = {products[i++]}></ListItem>
</div>
</div>
</div>
 </>)
  }
  else {
    return(
    <>
    <Header  shouldLogin = {getProds}></Header>;
    <div className='login_signup'>
        <h2>Please Signup/Login to procede! </h2>
    </div>
    </>
    )
  }
}
export default GetProducts;
