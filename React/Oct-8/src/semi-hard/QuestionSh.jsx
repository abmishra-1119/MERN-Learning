import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Todo = ({ todo, idx, removeFunc }) => {
    // console.log(id)
    return (
        <div>
            <p>{todo}</p>
            <button onClick={() => removeFunc(idx)}>remove</button>
        </div>
    )
}

const QuestionSh = () => {

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [del, setDel] = useState(false)

    const randomValue = () => {
        return Math.floor(Math.random() * 1000000).toString(16)

    }

    // console.log(Random)

    const addTodo = (e, newTodo) => {
        e.preventDefault()
        setTodos(prevArr => [...prevArr, newTodo])
        setTodo('')
    }



    const removeTodo = (id) => {
        todos.splice(id, 1)
        setDel(!del)
    }

    return (
        <div>
            <form onSubmit={(e) => addTodo(e, todo)} >
                <input type="text" name='Todo' placeholder='Enter Todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button type='submit' >Add Todo</button>
            </form>

            {
                todos.length > 0 ?
                    todos.map((todo, idx) => <Todo todo={todo} key={`${idx}-${randomValue()}`} idx={idx} removeFunc={removeTodo} />)
                    : <div>No Todos</div>
            }

        </div>
    );
}

export default QuestionSh;
