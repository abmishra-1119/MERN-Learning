import { BrowserRouter, Routes, Route } from 'react-router'


import './App.css'
import Question1 from './Questions/Question1'
import Question2 from './Questions/Question2'
import Question3 from './Questions/Question3'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Question1 />} />
          <Route path='/q2' element={<Question2 />} />
          <Route path='/q3' element={<Question3 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
