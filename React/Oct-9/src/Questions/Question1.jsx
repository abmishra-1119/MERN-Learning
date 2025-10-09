import React, { useRef, useState } from 'react';
import Input from '../components/Input';
import Age from '../components/Age';

const Question1 = () => {
    const [ag, setAg] = useState('')
    const [form, setForm] = useState({})

    const getValue = (val) => {
        // console.log(val)
        // setAg(val.value)

        setForm(prev => ({ ...prev, [val.name]: val.value }))
    }


    // console.log()
    const age = useRef(null)

    const OnSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        // console.log(age.current.name)
        setForm('')
        age.current = null
    }

    return (
        <div className='container' >
            <form className='form' onSubmit={OnSubmit} >
                <Input name={'First Name'} type={'text'} getvalue={getValue} />
                <Input name={'Last Name'} type={'text'} getvalue={getValue} />
                <Input name={'Email'} type={'email'} getvalue={getValue} />
                <Input name={'Phone'} type={'tel'} getvalue={getValue} />
                <Age name={'Age'} type={'number'} val={age} getvalue={getValue} />
                <Input name={'Password'} type={'password'} getvalue={getValue} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Question1;
