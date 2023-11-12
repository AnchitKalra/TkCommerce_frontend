import './header.css';
import Signup from '../signup/Signup';
import Login from '../login/Login';
import { Button, Modal, Snackbar, Typography, Alert } from '@mui/material';
import axios from 'axios';
import {  useEffect, useState } from 'react';
import {ReactComponent as AddTocart} from '../ListItem/Addtocart.svg';
import {useNavigate} from 'react-router-dom';


//import ShowCartItems from './ShowCartItem';

function Header(props) {
   
    let [isLogin, setLogin] = useState(false);
    let [isSignup, setSignup] = useState(false);
    let [loggedIn, setIsLogin] = useState(false);
    let [count, setCount] = useState(0);
    let [isOpen, setOpen] = useState(false);
    let [isClear, setClear] = useState(false);
    const navigate = useNavigate();

    


    
  async function loginWithToken() {

    try{
        
    let response = await axios.get('http://localhost:4000/user/login', {withCredentials:true});
    if(response.status === 200){
        setIsLogin(true);
        if(props?.shouldLogin){
            props.shouldLogin();
            showCart();

        }
    }}
    catch(err){
        console.log(err);
    }
}
loginWithToken();

    async function logout(){
        
    try{
        
        let response = await axios.delete('http://localhost:4000/user/logout', {withCredentials:true});
        console.log(response);
        setIsLogin(false)

    }
    catch(err){
        console.log(err);
    }
    }

   



   
    //setLoggedIn(params);
  
   

    function handleClose(e) {
            setSignup(false)
            setLogin(false);
    }


  
    useEffect(() => {
        showCart();
    }, [])


async function showCart() {
    try {
    let data = await axios.get("http://localhost:4000/cart/getCart", {withCredentials : true});
        console.log('logging get cart response');
        console.log(data.data.data);
        let {cart, totalValue} =  {...data.data.data};
        if(cart.length === 0) {
            setCount(0);
            return;
        }
        setCount(cart.length);
        return {cart, totalValue} ;
    }
    //return resp.data;
        catch(err) {
        console.log(err);
    }}
    showCart();

    
    async function showCartItems() {
        try {
        let data = await showCart();
        console.log('logging data');
        console.log(data);
        if(data === undefined) {
            setOpen(true);
            return;
        }
       console.log('logging SHOW CART ITEMS()')
    navigate('/cart',{state: data});
        }
        catch(err) {
            console.log(err);
        }

    }
    
    async function clearCart() {
        try{
            let response = await axios.delete("http://localhost:4000/cart/clearCart", {withCredentials : true});
            if(response.data.success) {
                setClear(true);
                showCart();
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    async function pastOrders() {
        try{
            console.log('logging past orders')
        let response = await axios.get('http://localhost:4000/order/prevOrders', {withCredentials: true});
        console.log(response);
        if(response.data.success) {
            let data = response.data.data;
            navigate('/orders', {state: data});
        }
        }
        catch(err) {
            console.log(err);
        }

    }

    function home() {
        navigate('/');
    }


  if(!loggedIn) {
    return(
      
        <div id = "divFlex">
            <div id = "tk">
                <Typography color={'greenyellow'} marginTop={"38px"} marginLeft={"30px"}>TKCART</Typography>
                </div>
                <>
            <Button id='signup' onClick={() => setSignup(true)}>SIGNUP</Button>
            </>
            <>
            <Modal
                open={isSignup}
                 onClose={handleClose}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
                ><><Signup /></></Modal></>
                <>
            <Button id='login' onClick={() => setLogin(true)}>LOGIN</Button>
            </>
            <>
            <Modal
                open={isLogin}
                 onClose={handleClose}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
                ><><Login /></></Modal></>
                
        </div>

    )}
    else {
        
        return(
            <>            <div>
            <Snackbar open={isOpen}
            autoHideDuration={3000}
            onClose={()=> setOpen(false)}><Alert severity ="warning"> Please add something to your cart first!</Alert></Snackbar>
            </div>
            <div>
            <Snackbar open={isClear}
            autoHideDuration={3000}
            onClose={()=> setClear(false)}><Alert severity ="success"> Cart cleared!</Alert></Snackbar>
            </div>
         
            <div id = "divFlex">
            <div id = "tk">
                <Typography color={'greenyellow'} marginTop={"38px"} marginLeft={"30px"}>TKCART</Typography>
                </div>
              
                <div id = "divButton"><AddTocart id = "cartButton" onClick = {showCartItems}> </AddTocart>
                </div>
              
                <div id = "supText"><sup id = "spanButton">{count}</sup></div>
            </div>
            <div id = "logout"><Button id = "logoutBtn"onClick={logout}>LOGOUT</Button>
            <Button id = "pastOrders"onClick={pastOrders}>PAST ORDERS</Button>
            <Button id = "clearCart" onClick = {clearCart}>CLEAR CART</Button>
            <Button id = "home" onClick = {home}>Go Back To Home Page</Button>
            </div>
          
            </>

        )
    } 
}

export default Header;