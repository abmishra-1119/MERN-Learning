import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import CommonInput from '../components/CommonInput';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/users/userSlice';



const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({})


    const { message } = useSelector(state => state.users)
    const appDispatch = useDispatch()


    const fetchData = useCallback(async (form) => {
        try {
            const res = await appDispatch(loginUser(form))
            // if (res.type === 'user/loginUser/fullfiled')
            if (loginUser.fulfilled.match(res)) {
                confirm('Login Succesfully')
                navigate('/')
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [appDispatch, navigate])

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
