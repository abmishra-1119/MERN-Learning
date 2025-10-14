import React from 'react';

const CommonInput = ({ name = "", type = "", label = "", change, value = '' }) => {
    return (
        <label >
            <label className='label' >{label}:</label>
            <input className='input' name={name} type={type} onChange={change} placeholder={`Enter ${label}`} required />
        </label>

    );
}

export default CommonInput;
