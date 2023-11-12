import {useLocation} from 'react-router-dom';
import Header from '../header/Header';
import {Card, CardContent, Typography, Rating} from '@mui/material';
import './style.css';

const ShowOrders = function() {
    let location = useLocation();
    console.log(location);
    let data = location.state;
    console.log(data);
    let cart = [];
    let totalValue = [];
    let orderId = [];
    try{
    for(let c of data) {
        cart = [...cart,"hello", ...c.cart];
        totalValue = [...totalValue, c.totalValue];
        orderId = [...orderId, c._id];
    }

  
    // for(let i = 0; i < totalValue.length; i++) {
    //    totalValue.push(totalValue[i]);
    // }
    console.log('cart');
    console.log(cart);
    console.log('totalValue');
    console.log(totalValue);
    }catch(err) {
        console.log(err);
    }
    let i = 0;
    let j = 0;




    return(
        <>
        <Header></Header>
        <div id = "gridDiv">
        {
         
        cart.map(item=>{

            
                if(item === null){
                    return"";
                }
         else   if(item === "hello") {
                  return  (<><Typography><h3> #{j + 1}</h3><h3>Order_Id: {orderId[j++]}</h3></Typography><div id = "flexDiv"><Typography><h3>Total Value: ${totalValue[i++]}</h3></Typography></div></>)  
            }else{
            return(
               
                <>

            <div id = "cardDiv">
            <Card>
                    <CardContent>
                      
                        <Typography>Item Name : {item.title}</Typography>
                        <Typography>Quantity : {item.quantity}</Typography>
                        <Typography>Price : ${item.price}</Typography>
                        <Typography>{item.description}</Typography>
                        <Rating value = {item.rating.rate}></Rating>
              </CardContent>
            </Card>
            </div>
            <div>
            
            </div>
            </>
            )}

        })
            
            
            }
            </div>

        </>
    )
}

export default ShowOrders;