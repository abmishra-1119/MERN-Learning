import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { authContext } from '../context/authContext';
import CommonInput from '../components/CommonInput';
import axios from 'axios';


const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({})
    // const [users, setUsers]


    const { setUser } = useContext(authContext)

    async function fetchData(form) {
        try {
            const response = await axios.get('http://localhost:3000/users');
            // console.log(response.data);
            const findUser = response.data.find((user) => user.username === form.username)
            if (findUser) {
                setMessage("User Already Registered")
            }
            else {
                const { confirmPassword, ...singlePass } = form
                await axios.post('http://localhost:3000/users', singlePass)
                setUser(singlePass)
                localStorage.setItem("user", JSON.stringify(singlePass))
                confirm('User Registered')
                navigate('/')
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const onRegister = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setMessage('Password Does match')
        }
        else {
            fetchData(form)
            setMessage('')
        }
        console.log(form);
    }

    const OnChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    return (
        <div className='login-page register'>
            <form onSubmit={onRegister}>
                <div className='login-form-heading'>
                    Register
                </div>
                <CommonInput name={'username'} label={'Username'} type={'text'} change={OnChange} />
                <CommonInput name='email' label={'Email'} type={'email'} change={OnChange} />
                <CommonInput name='phone' label={'Phone'} type={'tel'} change={OnChange} />
                <CommonInput name='password' label={'Password'} type={'password'} change={OnChange} />
                <CommonInput name='confirmPassword' label={'Confirm Password'} type={'password'} change={OnChange} />
                <button type='submit' >Register</button>
                {
                    message ?
                        <p className='login-error' >{message}</p>
                        :
                        ""
                }
            </form>
        </div>
    );
}

export default Register;
