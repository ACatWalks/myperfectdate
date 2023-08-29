import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Chats from './Chats'
import Login from './Login';
import MyMatches from './MyMatches'
import Signup from './Signup';
import Edit from './Edit'
import Profile from './Profile'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/chats' element={<Chats />} />
      <Route path='/login' element={<Login />} />
      <Route path='/matches' element={<MyMatches />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/edit" element={<Edit />} />
      <Route path='/:id' element={<Profile />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
