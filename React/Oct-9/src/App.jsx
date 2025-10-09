import './App.css'
import Question1 from './Questions/Question1'
import Question2 from './Questions/Question2'
import Question3 from './Questions/Question3'

function App() {

  return (
    <>
      <h2>Using single state Form</h2>
      <br />
      <Question1 />
      <br />
      <h2>Using Different States using Ref</h2>
      <br />
      <Question2 />
      {/* 
      <form>
        <input type="text" placeholder="text" required={true} minLength={2} maxLength={10} />
        <button type="submit">Submit</button>
      </form>
      <br />
      <br /> */}
      <br />
      <Question3 />
    </>
  )
}

export default App
