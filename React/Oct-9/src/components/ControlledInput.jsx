import React from 'react';

const ControlledInput = ({ name, type, val, getvalue, min }) => {


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

    return (
        <div>
            <label>
                <label style={{ margin: "2px" }} >{name}</label>
                <input required minLength={min} type={type} ref={val} name={name.trim().replace(' ', '')} placeholder={`Enter ${name}`} onChange={handleInput} />
                {/* <p style={{ color: 'red' }}>{message}</p> */}
            </label>
        </div>
    );
}

export default ControlledInput;
