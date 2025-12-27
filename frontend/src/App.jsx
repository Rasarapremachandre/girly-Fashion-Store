import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Catagories from './Pages/Catagories';
import Header from './Components/Header';
import Footer from './Components/Footer';
import CasualWears from './Pages/CasualWears';
import TopsPants from './Pages/Tops & Pants';
import Frocks from './Pages/Frocks';
import PartyDreseses from './Pages/Party Dresses';
import ProductDetails from './Components/ProductDetails';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import AdminDashboard from './Pages/Admindashboard';
import PrivateRoute from './Components/PrivateRoute';
import SalesProducts from './Components/SalesProducts';
import AllUsers from './Components/AllUsers';
import Cart from './Pages/Cart';












export default function App() {
  return (
<BrowserRouter>


<Header/>

  <Routes>
    
    <Route path="/" element={<Home/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/catagories" element={<Catagories/>} />
    <Route path="/casualwears" element={<CasualWears/>} /> 
    <Route path="/TopsPants" element={<TopsPants/>} />
    <Route path="/frocks" element={<Frocks/>} />
    <Route path="/partydreseses" element={<PartyDreseses/>} />
    <Route path="/product/:id" element={<ProductDetails />} />
    
    <Route path="/profile" element={<Profile/>} />
    <Route path="/admindashboard" element={<AdminDashboard/>} />
    
    
       {/* Admin Routes */} 
    <Route element={<PrivateRoute allowedRole="admin" />}>
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/ProductDetails" element={<ProductDetails />} />
      <Route path="/SalesProducts" element={<SalesProducts />} />
      <Route path="/AllUsers" element={<AllUsers />} />
    </Route>


    {/* Clients Routes */}
    <Route element={<PrivateRoute allowedRole="user" />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart/>} />
    </Route>

    

   

    
  </Routes>


<Footer/>
</BrowserRouter>
  )
}
