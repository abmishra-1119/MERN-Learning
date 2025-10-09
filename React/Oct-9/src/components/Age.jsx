import React from 'react';

const Age = ({ name, type, val, getvalue, min }) => {


    const handleInput = (e) => {
        // setInput(e.target.value);
        getvalue(e.target)
        // e.target.value = val.current.value
    }

    return (
        <div>
            <label style={{ margin: "5px" }}>{name}</label>
            <input required min={min} type={type} name={name} ref={val} placeholder={`Enter ${name}`} onChange={handleInput} />
        </div>
    );
}

export default Age;
