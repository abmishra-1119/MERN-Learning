import React from 'react';
import { useState } from 'react';

const UncontrolledInput = ({ name, type, val, getvalue, min }) => {
    const [message, setMessage] = useState('')


    const handleInput = (e) => {
        if (e.target.value.length < min) {
            setMessage('Enter a valid Input')
        }
        else {
            setMessage('')
        }
        getvalue()

    }
    return (
        <div className='input' >
            <label style={{ margin: "5px" }}>{name}</label>
            <input required min={min} type={type} name={name} ref={val} placeholder={`Enter ${name}`} onChange={handleInput} />
            <p style={{ color: 'red' }}>{message}</p>
        </div>
    );
}

export default UncontrolledInput;
