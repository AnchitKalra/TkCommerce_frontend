import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowCartItems from './header/ShowCartItem';
import ShowOrders from './showOrders/ShowOrders';
//import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
  <Routes> 
                <Route exact path='/' element={< App />}></Route> 
                <Route exact path='/cart' element={< ShowCartItems/>}></Route>
                <Route exact path = '/orders' element = {<ShowOrders/>}></Route> 
        </Routes> 
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
