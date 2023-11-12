import React, { useState} from "react";
import { Button,  Alert, Snackbar, TextField,  } from "@mui/material";
import './login.css';
import axios from 'axios';




const  Login = ()=> {

   // const instance = axios.create({ baseURL: 'http://localhost:4000/',withCredentials:true });
    let [isOpen, setOpen] = useState(false);
    let [resetFlag, setResetFlag] = useState(false);

    let [isPassword, setPassword] = useState(false);
    let [isReset, setReset] = useState(false);
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
    const submitHandler = async(e, flag) =>{
        try {
        e.preventDefault();
        if(flag) {
            if(data.username && data.password && resetFlag) {
                if(!flag){
                resetPassword();
                return;
                }
            }
            let btn = document.getElementById('submit');
            btn.removeEventListener('click', submitHandler);
            btn.innerText = "Reset";
            btn.addEventListener('click', resetPassword);
           setResetFlag(true);
           setPassword(true);  
          
        }
        else {
        console.log(data);
        console.log('after');
        console.log(data);
        setSubmitHandler(data);
        loginData();
        }}catch(err) {
            console.log(err);
        }
    }

    const resetPassword = async() => {
        try{
       
            setSubmitHandler(data);
            setPassword(false);
            let{username, password} = data;
            let payload = {username, password};
            let response = await axios.patch("http://localhost:4000/user/resetPassword", payload, {withCredentials: true});
             if(response.data.success) {
            setReset(true);
             }}catch(err){
                console.log(err);
             }
    }

        
      
      

    return(
    <>
        <Snackbar open={isOpen}
        autoHideDuration={2000}
        onClose={()=> setOpen(false)}><Alert severity ="success">You have Logged in successfully!</Alert></Snackbar>
        <>
         <Snackbar open={isPassword}
        autoHideDuration={4000}
        onClose={()=> setPassword(false)}><Alert severity ="warning">Please enter your username and a chosen Password in the form itself!</Alert></Snackbar>
        </>
        <>
         <Snackbar open={isReset}
        autoHideDuration={2000}
        onClose={()=> setReset(false)}><Alert severity ="success">Password reset successfully!</Alert></Snackbar>
        </>
        <div className="formDiv">
    <form>

        <div className='divContainer'>
        <TextField className="filled-basic" label="Enter your username" variant="filled"  id = "username" required = {true} onChange={inputHandler}/>
        </div>

        <div className='divContainer'>
            <TextField className="filled-basic" type = "password" label="Enter your password" variant="filled"   id = "password" required = {true} onChange={inputHandler}/>
        </div>
        <div className='divContainer'>
            <Button id = "submit"  onClick={submitHandler}>SUBMIT</Button>
            <Button onClick={(event) => submitHandler(event, true)}>Forgot Password</Button>
        </div>
       
    </form>
    </div>
</>)
}

export default Login;