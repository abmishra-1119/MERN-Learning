import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Todo = ({ todo, idx, removeFunc, EditFunc }) => {
    // console.log(id)
    return (
        <div className='container' >
            <div className='todo'>
                <p>Title: {todo.title}</p>
                <p>Description: {todo.description}</p>
                <p>Priority: {todo.priority}</p>
                <div style={{ display: 'flex', gap: "10px", paddingLeft: "10px" }}>
                    <button onClick={() => removeFunc(idx)}>remove</button>
                    <button onClick={() => EditFunc(idx)}>edit</button>
                </div>
            </div>
        </div>
    )
}


const Form = ({ addTodo, newTitle = "", newdDescription = "", newPriority = "Low", id = undefined }) => {

    const [title, setTitle] = useState(newTitle)
    const [description, setDescription] = useState(newdDescription)
    const [priority, setPriority] = useState(newPriority)


    const sumbitForm = (e) => {
        addTodo(e, id, title, description, priority)
        setTitle('')
        setDescription('')
        setPriority('Low')
    }

    return (<>
        <form onSubmit={sumbitForm} className='form' >
            <input required={true} type="text" name='Todo' placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea required={true} type="text" name='Todo' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type='submit' >{id === undefined ? "Add Todo" : "Update Todo"}</button>
        </form>
    </>)

}


const Question3 = () => {

    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [priority, setPriority] = useState('Low')
    const [todos, setTodos] = useState([])
    const [del, setDel] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState(undefined)
    const [editData, setEditData] = useState({})

    const randomValue = () => {
        return Math.floor(Math.random() * 1000000).toString(16)

    }

    // console.log(Random)

    const addTodo = (e, id, title, description, priority) => {
        e.preventDefault()
        if (id !== undefined) {
            todos[id] = { title, description, priority }
        }
        else {
            setTodos(prevArr => [...prevArr, { title, description, priority }])
        }

        setEditId(undefined)
        setEdit(false)
        console.log(id, title, description, priority)
        //     setTitle('')
        //     setDescription('')
        //     setPriority('Low')
    }




    const removeTodo = (id) => {
        todos.splice(id, 1)
        setDel(!del)
    }

    const EditTodo = (id) => {
        console.log(id, edit, editId, editData)
        setEdit(true)
        setEditId(id)
        setEditData(todos[id])
    }

    return (
        <div className='container'>
            {/* <form onSubmit={(e) => addTodo(e, title, description, priority)} className='form' >
                <input required={true} type="text" name='Todo' placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea required={true} type="text" name='Todo' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type='submit' >Add Todo</button>
            </form> */}


            {/* {
                edit ?
                    <Form addTodo={addTodo} newTitle={todos[editId].title} newdDescription={todos[editId].description} newPriority={todos[editId].priority} />
                    :
                    <Form addTodo={addTodo} />
            } */}

            <Form addTodo={addTodo} />

            {
                edit && editData ?
                    <div className='bg-dark' >
                        <Form addTodo={addTodo} id={editId} newTitle={editData.title} newdDescription={editData.description} newPriority={editData.priority} />
                    </div>
                    : ""
            }

            <div className='wrap'>
                {
                    todos.length > 0 ?
                        todos.map((todo, idx) => <Todo todo={todo} key={`${idx}-${randomValue()}`} idx={idx} removeFunc={removeTodo} EditFunc={EditTodo} />)
                        : <div>No Todos</div>
                }
            </div>
        </div>
    );
}

export default Question3;
