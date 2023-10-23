import {React, useState} from "react";
import Products from "../products/Products";

const Login = (props) =>{
    console.log(props);


    const [data, setSubmitHandler] = useState({
        username:"",
        password:""
    });

    const inputHandler = (e) =>{
        data.e.target.name = e.target.value
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(data);
        setSubmitHandler({
            "username":data.username,
            "password":data.password
        });
        console.log('after');
        const funct = async() =>{
                await fetch('http://127.0.0.1:4000/user/login',  {
                method: "POST",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                },

                body:JSON.stringify({
                    "username": data.username, "password":data.password
                })
            })

        }
        funct().then((result) => result.json()).then((data) => {
            if(data.success) {
                return (
                    <div>
                        <Products></Products>
                    </div>
                )
            }
            else{
                throw new Error('Account does not exist' );
            }
        }).catch(e => console.log(e));
      }

    return(
    <div>
    <form>

        <div className='divContainer'>
            <label htmlFor="username">UserName:</label>
            <input type = "text" className = "username" id = "username" required = {true} onChange={inputHandler}/>
        </div>

        <div className='divContainer'>
            <label htmlFor="password">Password:</label>
            <input type = "password" className = "password" id = "password" required = {true} onChange={inputHandler}/>
        </div>
        <div className='divContainer'>
            <button type="submit" onClick={submitHandler}>SUBMIT</button>
        </div>
    </form>
</div>)
}

export default Login;