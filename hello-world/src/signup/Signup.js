import {React, useState, useEffect} from 'react';
import './signup.css';
import axios from 'axios';
import {Input, Snackbar, Button} from '@mui/material';
const Signup = () =>{

    let [data, setSubmitHandler] = useState({
        name:"",
        username:"",
        password:""
    });

    let [apiResponse, setResponse] = useState(null);

    const [open, setOpen] = useState(false);


    function handleCLose() {
        setOpen(false);
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        setSubmitHandler({"name":data.name,
        "username":data.username,
        "password":data.password
        })
      console.log(data);
}

useEffect(()=>{
    async function signUp() {
        try {
    const options = {
        method: 'POST',
        url: 'http://192.168.1.5:4000/user/signup',
        headers: {
            'content-type': 'application/json',
        },
        data: data}
   let response =  await axios.request(options);
   console.log(response.data);
   apiResponse = response.data;
  if(apiResponse?.sucess) {
    setOpen(true);
  }

}catch(err) {
    console.log(err);
}

}
signUp();
}
    , [data.username !== '']);

   const inputHandler = (e) =>{
     data[e.target.id] = e.target.value;
   }


return(
    <div id = "outerSign">
         <Snackbar
        open={open}
        severity = "success"
        autoHideDuration={6000}
        message= "Your account has been created successfully"
        onClick={handleCLose}
      />
    <form>   
        <div className='divContainer'>
        <label>Name</label>
        <Input type = "text" className = "name" id = "name" required = {true} onChange={inputHandler} />
        </div>

        <div className='divContainer'>
        <label>UserName</label>
        <Input type = "text" className = "username" id = "username" required = {true} onChange={inputHandler} />
        </div>

        <div className='divContainer'>
        <label>Password</label>
        <Input type = "password" className = "password" id = "password" required = {true} onChange={inputHandler} />
        </div>
        <div className='divContainer'>
        <Button type="submit" onClick={submitHandler}>SUBMIT</Button>
        </div>
        </form>
        </div>)
  
}

export default Signup;