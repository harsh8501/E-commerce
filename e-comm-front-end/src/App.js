import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/nav';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route element={<PrivateComponent />}>
      <Route path='/' element={<ProductList />}></Route>
      <Route path='/update/:id' element={<UpdateProduct />} ></Route>
      <Route path='/add' element={<AddProduct />} ></Route>
      <Route path='/profile' element={<h1>Profile Componenet</h1>} ></Route>
      <Route path='/logout' element={<h1>Logout Componenet</h1>} ></Route>
      </Route>

      <Route path='/login' element={<Login />} ></Route>
      <Route path='/signup' element={<Signup />} ></Route>
      </Routes> 
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
