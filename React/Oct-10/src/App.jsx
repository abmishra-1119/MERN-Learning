import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Profile from './pages/profile'
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import EditProduct from './pages/EditProduct'
import Register from './pages/Register'
import Layout from './pages/Layout'
import AddProduct from './pages/AddProduct'
import { useAppContext } from './context/AppContext'
import NotFound from './pages/NotFound'


function App() {

  const { state } = useAppContext()
  const { user } = state

  // console.log(user);

  return (
    <>
      <BrowserRouter>
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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
