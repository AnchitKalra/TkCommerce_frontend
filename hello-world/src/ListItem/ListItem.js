import './item.css';
import {ReactComponent as AddTocart} from './Addtocart.svg'
import {Card, CardActions, CardContent, CardMedia, Typography, Button} from '@mui/material';
import { useState } from 'react';


const ListItem =  (props) =>{
    console.log('LOGGING PROPS')
    console.log(props);
    
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
    
return(
  <Card>
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
         {data.description}
        </Typography>
      </CardContent>
  <CardActions>
        <Button id = 'minus' size="small" onClick = {minusHandler}>-</Button>
        <Button className = "btn" size="large"><AddTocart height= "40px" width= "50px"></AddTocart></Button>
        <Button id = 'plus' onClick = {plusHandler}>+{count}</Button>
      </CardActions>
      </Card>
  )}

export default ListItem;