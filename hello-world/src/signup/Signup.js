import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './signup.css';
import axios from 'axios';
import {TextField, Snackbar, Button, Alert} from '@mui/material';
const Signup = () =>{

    let [data, setSubmitHandler] = useState({
        name:"",
        username:"",
        password:""
    });

    let apiResponse;

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();


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
      setTimeout(() =>{
      navigate('/');
      }, 2000)
}

useEffect(()=>{
    async function signUp() {
        try {
    const options = {
        method: 'POST',
        url: 'http://localhost:4000/user/signup',
        headers: {
            'content-type': 'application/json',
        },
        data: data}
   let response =  await axios.request(options);
   console.log(response.data);
   apiResponse = response?.data;
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
    <>        
     <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleCLose}
      ><Alert severity = "success">Your account has been created successfully</Alert></Snackbar>

      <div className='formDiv'>
    <form>   
        <div className='divContainer'>
        <TextField className="filled-basic" label="Enter yor name" variant="filled"  id = "name" required = {true} onChange={inputHandler} />
        </div>

        <div className='divContainer'>
        <TextField className="filled-basic" label="Enter a username" variant="filled"  id = "username" required = {true} onChange={inputHandler} />
        </div>

        <div className='divContainer'>
        <TextField className="filled-basic" type='password' label="Enter a password" variant="filled"  id = "password" required = {true} onChange={inputHandler} />
        </div>
        <div className='divContainer'>
        <Button type="submit" onClick={submitHandler}>SUBMIT</Button>
        </div>
        </form>
        </div>
        </>)
  
}

export default Signup;