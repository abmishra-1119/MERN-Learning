import React, { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import CommonInput from '../components/CommonInput';
import { registerUser } from '../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const Register = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({})


    const { user, message } = useSelector(state => state.users)
    const appDispatch = useDispatch()

    const fetchData = useCallback(async (form) => {
        try {
            const res = await appDispatch(registerUser(form))
            if (registerUser.fulfilled.match(res)) {
                confirm('User Registered')
                navigate('/')
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [user, navigate])

    const onRegister = (e) => {
        e.preventDefault();
        fetchData(form)
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
