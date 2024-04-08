import AppNavbar from './components/AppNavbar';

import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import Logout from './pages/Logout';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';
import OrderHistory from './pages/OrderHistory';


import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import { UserProvider } from './UserContext';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(typeof data._id !== "undefined"){

        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });

      } else {

        setUser({
            id: null,
            isAdmin: null
        })
      }
    })
    console.log(localStorage);
  }, [])


  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        
            <AppNavbar/>
            <Routes>
              <Route path="/" element ={ <Home />}/>
              <Route path="/products" element ={ <Products />}/>
              <Route path="/products/:productId" element ={ <ProductView />}/>
              <Route path="/register" element ={ <Register />}/>
              <Route path="/login" element ={ <Login />}/>
              <Route path="/logout" element ={ <Logout />}/>
              <Route path="*" element ={ <ErrorPage />}/>
              <Route path="/profile" element ={ <Profile />}/>
              <Route path="/addProduct" element ={ <AddProduct />}/>
              <Route path="/orders" element ={ <OrderHistory />}/>
            </Routes>
        
      </Router> 
    </UserProvider> 
  );
}

export default App;
