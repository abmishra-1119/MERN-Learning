import React from 'react';
import { useState } from 'react';


const Student = ({ student }) => {
    return (
        <div>{student}</div>
    )
}

const QuestionMd = () => {
    const [stName, setStName] = useState('')
    const [students, setStudents] = useState([])

    const addStudent = (newStudent) => {
        // event.preventDefault()
        setStudents(prevArr => [...prevArr, newStudent])
        setStName('')
    }
    return (
        <div>
            {/* <form onSubmit={() => this.addStudent.bind(this, stName)}  >
                <input type="text" name='student' placeholder='Enter name' value={stName} onChange={(e) => setStName(e.target.value)} />
                <button type='submit'>Add</button>
            </form> */}

            <input type="text" name='student' placeholder='Enter name' value={stName} onChange={(e) => setStName(e.target.value)} />
            <button type='submit' onClick={() => addStudent(stName)} >Add</button>

            {students.map((student, key) => <Student student={student} key={`${key}-${student}`} />)}

        </div>
    );
}

export default QuestionMd;
