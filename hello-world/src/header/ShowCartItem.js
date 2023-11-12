import React, { useState } from "react";
import {Card, Typography,  CardActions, CardContent, Button, Snackbar, Alert} from '@mui/material';
import {ReactComponent as AddTocart} from '../ListItem/Addtocart.svg';
import './showcart.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function ShowCartItems() {

    let location = useLocation();
    let [isOpen, setOpen] = useState(false);
    let navigate = useNavigate();
    let [isCheckout, setCheckout] = useState(false);

   // let [quantity, setQuantity] = useState([{id, qty}]);
   let uniqueKeyMinus = 100;
   let uniqueKeyPlus = 0;

    console.log('LOGGING LOCATION');
    console.log(location.state);
    let data = location.state;
    console.log('logging data from ShowCart');
    console.log(data);





    let handleCart = (e, item) => {
        try{
            let buttonName = e.target.name;
            console.log('logging name');
            console.log(e.target.name);
        let previousPrice = parseInt(item.price) * item.quantity;
        item.prevPrice = previousPrice; 
        let id = e.target.id;
        console.log('logging from handleCart')
        console.log(id);
        let btn = document.getElementsByName('plus')[id];
        console.log('logging btn');
        //console.log(btn);
        var quantity = 0;
        let text = btn.innerText;
            console.log('logging btn text');
            console.log(text);

            for(let i = 0; i < text.length; i++) {
                if(text.charAt(i) >= '0' && text.charAt(i) <= 9) {
                    quantity += parseInt(text.charAt(i));
                }
            }

            if(buttonName === 'minus') {
                if(quantity > 0) {
                    quantity--;
                    btn.innerText = '+' + quantity;
                }
                else{
                    return;
                }
            }
            if(buttonName === 'plus') {
                quantity++;
                btn.innerText = '+' + quantity;
            }
        item.quantity = quantity;
        console.log('logging quantity');
        console.log(quantity);
        console.log('logging item');
        console.log(item);
        let data = item;


        async function updateCart(data) {
            try{
                data.listItemFlag = false;
            let response = await axios.patch('http://localhost:4000/cart/updateCart',data,  {withCredentials:true});
            console.log(response);
            if(response) {
                setOpen(true);
                
                if(response.status === 200) {
                    let {data} = response;
                    if(data?.response) { 
                    navigate('/cart', {state: data.response});
                    }
                    else {
                        navigate('/');
                    }
                }
                // location.state = data;
                // console.log(location.state);

            }
            }catch(err) {
                console.log(err);
            }
        }
        updateCart(data);}
        catch(err) {
            console.log(err);
        }


    }


   

  

    async function checkout(){
        try{
            if(data.totalValue === 0) {
                let message = "Empty Cart Cannot checkout!";
                navigate("/", {state: message});
        }
        let response = await axios.get("http://localhost:4000/cart/checkout", {withCredentials : true});
        console.log(response);
            if(response.data.success){
                setCheckout(true);
                setTimeout(() => {
                navigate('/');
                setCheckout(false);
                }, 2000);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    return(
        <>
        <div>
             <Snackbar open={isOpen}
      autoHideDuration={6000}
      onClose={()=> setOpen(false)}><Alert severity ="success">Item/s successfully updated</Alert></Snackbar>
        </div>
        <div>
        <Snackbar open={isCheckout}
      autoHideDuration={6000}
      onClose={()=> setCheckout(false)}><Alert severity ="success">`Order successfully placed!`</Alert></Snackbar>
        </div>

        <div id = "itemsDiv">
       {data.cart.map(item =>{
        
           return(
         <div id = "card">
            <Card>
            <CardContent>
        <Typography  component="div">
            Product Name = {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Quantity = {
            item.quantity|| 0

         }
        </Typography>
        <Typography>Price = ${item.price}</Typography>
      </CardContent>
  <CardActions>
        <Button id = {uniqueKeyPlus} size="small" name = "minus" value = "minus"key = {uniqueKeyMinus++}onClick = {(event) => handleCart( event, item)}>-</Button>
        <Button id = {uniqueKeyPlus} className = "btn" size="large" ><AddTocart id = {uniqueKeyPlus}height= "40px" width= "50px"onClick={(event)=> handleCart(event, item, item.quantity || 0)}></AddTocart></Button>
        <Button id = {uniqueKeyPlus} name = "plus" value = "plus" key = {uniqueKeyPlus++}onClick ={(event)=> handleCart(event, item)}>+{item.quantity|| 0}</Button>
      </CardActions>
                    </Card>
            </div> 

             )
            

       })}
       <div id = "total">
        <Card>
        <CardContent>
            <Typography>{data.totalValue}</Typography>
       </CardContent>
       <CardActions>
        <Button onClick={checkout}>CHECKOUT</Button>
       </CardActions>
       </Card>
       </div>
       </div>

        </>)
    
}
export default ShowCartItems;
