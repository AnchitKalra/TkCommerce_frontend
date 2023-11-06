import React, { useState} from "react";
import { Button, Input, Alert, Snackbar } from "@mui/material";
import './login.css';
import axios from 'axios';




const  Login = ()=> {

   // const instance = axios.create({ baseURL: 'http://localhost:4000/',withCredentials:true });
    let [isOpen, setOpen] = useState(false);
    const [data, setSubmitHandler] = useState({
        username:"",
        password:""
    });

    const inputHandler = (e) =>{
        let id = e.target.id;
        data[id] = e.target.value;
    }
    async function loginData() {
        try{
           
          let{username, password} = data;
         let payload = {username, password};
         console.log('logging payload');
         console.log(payload);
    let response = await axios.post("http://localhost:4000/user/login", payload, {withCredentials: true});
        let responseData = response.data;
       console.log(responseData)
        if(responseData.success) {
            setOpen(true);
        }

    }
    catch(err) {
        console.log(err);
    }
        }
    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(data);
        console.log('after');
        console.log(data);
        setSubmitHandler(data);
        loginData();
    }
        
      
      

    return(
    <>
        <Snackbar open={isOpen}
        autoHideDuration={2000}
        onClose={()=> setOpen(false)}><Alert severity ="success">You have Logged in successfully!</Alert></Snackbar>
        <div className="formDiv">
    <form>

        <div className='divContainer'>
            <label>UserName</label><br></br>
            <Input type = "text" id = "username" required = {true} onChange={inputHandler}/>
        </div>

        <div className='divContainer'>
            <label>Password</label>
            <Input type = "password" id = "password" required = {true} onChange={inputHandler}/>
        </div>
        <div className='divContainer'>
            <Button type="submit" onClick={submitHandler}>SUBMIT</Button>
        </div>
    </form>
    </div>
</>)
}

export default Login;