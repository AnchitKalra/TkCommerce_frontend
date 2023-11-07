import './item.css';
import {ReactComponent as AddTocart} from './Addtocart.svg'
import {Card, CardActions, CardContent, CardMedia, Typography, Button, Rating, Snackbar, Alert} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const ListItem =  (props) =>{
    let [isError, setError] = useState(false);
    let location = useLocation();
    let [isZeroCount, setZeroCount] = useState(false);
    let [isDanger, setDanger] = useState(false);
    
    let data = props?.data ? props.data : props;
    let [count, setCount] = useState(0);
    let plusHandler = () =>{
        setCount(++count);
    }

    let minusHandler = ()=>{
        if(count === 0) {
            return;
        }
        setCount(--count);
    }
    useEffect(() =>{
        setTimeout(()=>{
            if(location.state === 'Empty Cart Cannot checkout!') {
                setError(true);
            }
        },3000);
       
    })

    let [isOpen, setOpen] = useState(false);
    let handleCart = async()=>{
        try {
        if(data) {
            data.quantity = count;
            console.log(data);
            if(count > 0) {
            let response = await axios.patch("http://localhost:4000/cart/updateCart", data, {withCredentials: true});
            console.log(response);
            if(response.data) {
                setOpen(true);
            }
            else {
                setDanger(true);
            }
        }
        else {
            setZeroCount(true);
        }
        }}catch(err) {
            console.log(err);
        }
    }
    
return(
  <Card height = "300px" width = "300px">
  <CardMedia
        sx={{ height: 140 }}
        image= {data.image}
        title= {data.title}
      />
  <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            ${data.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {
            data.description

         }
        </Typography>
        <Rating value = {data.rating.rate} readOnly></Rating>
      </CardContent>
  <CardActions>
        <Button id = 'minus' size="small" onClick = {minusHandler}>-</Button>
        <Button className = "btn" size="large" onClick={handleCart}><AddTocart height= "40px" width= "50px"></AddTocart></Button>
        <Button id = 'plus' onClick = {plusHandler}>+{count}</Button>
      </CardActions>
      <Snackbar open={isOpen}
        autoHideDuration={3000}
        onClose={()=> setOpen(false)}><Alert severity ="success"> Item/s added to cart successfully!</Alert></Snackbar>
         <Snackbar open={isDanger}
        autoHideDuration={3000}
        onClose={()=> setDanger(false)}><Alert severity ="error"> Something went wrong!</Alert></Snackbar>
          <Snackbar open={isZeroCount}
        autoHideDuration={3000}
        onClose={()=> setZeroCount(false)}><Alert severity ="warning"> Please specify a quantity!</Alert></Snackbar>
           <Snackbar open={isError}
        autoHideDuration={3000}
        onClose={()=> setError(false)}><Alert severity ="error"> Cart is Empty Cannot Checkout!</Alert></Snackbar>
      </Card>
  )}

export default ListItem;