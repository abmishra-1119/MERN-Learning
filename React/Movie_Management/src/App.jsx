import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import AuthGuard from './components/AuthGuard'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/' element={<AuthGuard />}>
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
