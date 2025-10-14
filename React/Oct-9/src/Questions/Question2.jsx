import React, { useRef, useState } from 'react';
import Input from '../components/Input';
import Age from '../components/Age';
import UncontrolledInput from '../components/UncontrolledInput';

const Question2 = () => {
    const [age, setAge] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [phone, setPhone] = useState('')

    const [message, setMessage] = useState('')


    // const [form, setForm] = useState({})

    const ageRef = useRef(null)
    const frirstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const phoneRef = useRef(null)



    const getValue = () => {
        setAge(ageRef.current.value)
        setFirstName(frirstNameRef.current.value)
        setLastName(lastNameRef.current.value)
        setPhone(phoneRef.current.value)
        setEmail(emailRef.current.value)
        setPassword(passwordRef.current.value)
    }

    const setReset = () => {
        setAge('')
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setPhone('')
        ageRef.current.value = ""
        frirstNameRef.current.value = ""
        lastNameRef.current.value = ""
        emailRef.current.value = ""
        passwordRef.current.value = ""
        phoneRef.current.value = ""

    }


    const OnSubmit = (e) => {
        e.preventDefault()
        console.log("First Name: ", firstName, "Last Name: ", lastName, "Age: ", age, "Email: ", email, "Password: ", password, "Phone: ", phone)

        setReset()
    }

    return (
        <>
            <div className='heading'>
                <h2>This is form with a Different State and using unControlled Components using ref</h2>
            </div>
            <div className='container' >
                <form className='form' onSubmit={OnSubmit} >
                    <UncontrolledInput name={'First Name'} type={'text'} val={frirstNameRef} getvalue={getValue} min={2} />
                    <UncontrolledInput name={'Last Name'} type={'text'} val={lastNameRef} getvalue={getValue} min={2} />
                    <UncontrolledInput name={'Email'} type={'email'} val={emailRef} getvalue={getValue} />
                    <UncontrolledInput name={'Phone'} type={'number'} val={phoneRef} getvalue={getValue} min={10} />
                    <UncontrolledInput name={'Age'} type={'number'} val={ageRef} getvalue={getValue} />
                    <UncontrolledInput name={'Password'} type={'password'} val={passwordRef} getvalue={getValue} min={6} />
                    <button type='submit'>Submit</button>
                </form>

            </div>
        </>
    );
}

export default Question2;
