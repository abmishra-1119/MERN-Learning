import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { authContext } from '../context/authContext';
import CommonInput from '../components/CommonInput';
import axios from 'axios';

const userDetail = {
    "username": "admin",
    "password": "1234"
}

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({})


    const { setUser } = useContext(authContext)

    async function fetchData(form) {
        try {
            const response = await axios.get('http://localhost:3000/users');
            // console.log(response.data);
            const findUser = response.data.find((user) => user.username === form.username && user.password === form.password)

            if (findUser) {
                setUser(findUser)
                setMessage('')
                localStorage.setItem("user", JSON.stringify(findUser))
                confirm('Login Succesfully')
                navigate('/')
            }
            else {
                setMessage('Login Failed')
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const onLogin = (e) => {
        e.preventDefault();

        fetchData(form)
        // if (username === userDetail.username && password === userDetail.password) {
        //     setUser(userDetail)
        //     setMessage('')
        //     localStorage.setItem("user", JSON.stringify(userDetail))
        //     navigate('/')
        // }
        // else {
        //     setMessage('Login Failed')
        // }
        // console.log(password, email);

    }
    const OnChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }
    return (
        <div className='login-page'>
            <form onSubmit={onLogin}>
                <div className='login-form-heading'>
                    Login
                </div>
                <CommonInput name={'username'} label={'Username'} type={'text'} change={OnChange} />
                <CommonInput name='password' label={'Password'} type={'password'} change={OnChange} />

                <button type='submit' >Login</button>
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

export default Login;
