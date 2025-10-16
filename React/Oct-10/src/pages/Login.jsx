import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { authContext } from '../context/authContext';
import CommonInput from '../components/CommonInput';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { useDispatch, useSelector } from 'react-redux'
// import { fetchUsers } from '../features/users/userSlice';

const userDetail = {
    "username": "admin",
    "password": "1234"
}

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({})


    // const users = useSelector(state => state.users.users)
    const appDispatch = useDispatch()

    const { state, dispatch } = useAppContext()

    const { message } = state


    const fetchData = useCallback(async (form) => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            const findUser = response.data.find((user) => user.username === form.username && user.password === form.password)
            if (findUser) {
                dispatch({ type: "user", payload: findUser })
                dispatch({ type: 'message', payload: '' })
                localStorage.setItem("user", JSON.stringify(findUser))
                confirm('Login Succesfully')
                navigate('/')
            }
            else {
                dispatch({ type: 'message', payload: 'Login Failed' })
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [dispatch, navigate])

    const onLogin = (e) => {
        e.preventDefault();
        fetchData(form)

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
