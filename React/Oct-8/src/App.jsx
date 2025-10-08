import { useState } from 'react'
import './App.css'
import Question1 from './easy/Question1'
import Question2 from './easy/Question2'
import Question3 from './easy/Question3'
import QuestionMd from './medium/QuestionMd'
import QuestionMd3 from './medium/QuestionMd3'
import QuestionSh from './semi-hard/QuestionSh'
import QuestionMd2 from './medium/QuestionMd2'

function App() {

  const [show, setShow] = useState(true)

  return (
    <>
      <h2>Easy Questions</h2>
      <br />
      <Question1 />
      <br />
      <Question2 />
      <br />
      <Question3 />
      <br />
      <h2>Medium Questions</h2>
      <br />
      <QuestionMd />
      <br />
      <QuestionMd2 />
      <br />
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show ? <QuestionMd3 /> : <div>Unmounted</div>}
      <br />
      <h2>Question Semi-Hard</h2>
      <br />
      <QuestionSh />
    </>
  )
}

export default App
