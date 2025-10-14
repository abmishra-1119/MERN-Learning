import React, { useState } from 'react';

const Input = ({ name, type, val, getvalue, min }) => {

    // const [message, setMessage] = useState('')

    const handleInput = (e) => {
        // if(e.target)
        // setInput(e.target.value);
        getvalue(e.target)
        // e.target.value = val.current.value
        // if (e.target.value <= min) {
        //     setMessage(`minimum ${min} character`)
        // }
        // console.log(message);

    }


    // const id = Math.floor(Math.random() * 100000).toString(36)

    return (
        <label className='input'>
            <label style={{ margin: "2px" }} >{name}</label>
            <input required minLength={min} type={type} ref={val} name={name.trim().replace(' ', '')} placeholder={`Enter ${name}`} onChange={handleInput} />
            {/* <p style={{ color: 'red' }}>{message}</p> */}
        </label>
    );
}

export default Input;
