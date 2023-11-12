import './app.css';
import axios from 'axios';
import GetProducts from './products/Products';
import {useState} from 'react';
const App = () =>  {

  let [isLoggedIn, setIsLogin] = useState(false);



  async function loginWithToken() {
    try{
    let response = await axios.get('http://localhost:4000/user/login', {withCredentials:true});
    if(response.status === 200){
        setIsLogin(true);
    }}
    catch(err){
        console.log(err);
    }
}


loginWithToken();



  return (
    <div id="outer">
    <GetProducts isLoggedIn = {isLoggedIn}></GetProducts>
  </div>
  )
}
export default App;
