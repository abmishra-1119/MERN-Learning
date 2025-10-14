import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Profile from './pages/profile'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Product from './pages/Product'
import EditProduct from './pages/EditProduct'
import Register from './pages/Register'
import Layout from './pages/Layout'
import { authContext } from './context/authContext'
import { useEffect, useState } from 'react'
import AddProduct from './pages/AddProduct'

function App() {
  const [user, setUser] = useState(null)


  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
    catch (e) {
      console.error(e)
    }
  }, []);

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }



  return (
    <>
      <BrowserRouter>
        <authContext.Provider value={{ user, logout, setUser }}  >
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route path='' element={<Home />} />
              <Route path='product/:id' element={<Product />} />
              <Route path='about' element={<About />} />
              {
                user ?
                  <>
                    <Route path='dashboard' element={<Dashboard />}>
                      <Route path='' element={<AddProduct />} />
                      <Route path='profile' element={<Profile />} />
                    </Route>
                    <Route path='edit-product/:id' element={<EditProduct />} />
                  </>
                  :
                  <>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                  </>
              }
            </Route>
          </Routes>
        </authContext.Provider>
      </BrowserRouter >
    </>
  )
}

export default App
