import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../features/Auth/userSlice';
const SignUp = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({})


    const { message } = useSelector(state => state.users)
    const appDispatch = useDispatch()


    const fetchData = useCallback(async (form) => {
        try {
            const res = await appDispatch(loginUser(form))
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
        <div
            className='h-[calc(100vh-5rem)] flex justify-center items-center'
            style={{
                backgroundImage: `url('./loginbg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='absolute opacity-50 bg-black w-full h-[calc(100vh-5rem)]'>
            </div>

            <form onSubmit={onLogin} className="w-96 p-8 rounded-lg shadow-xl bg-gray-800 border border-gray-700 relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                        Your Username
                    </label>
                    <input
                        name='username'
                        type="text"
                        id="username"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="username"
                        required
                        onChange={OnChange}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                        Your password
                    </label>
                    <input
                        name='password'
                        type="password"
                        id="password"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********"
                        required
                        onChange={OnChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Login to CineVerse
                </button>

                <div>
                    <p className='px-5 py-2.5 text-white text-sm'>Create new Account? <Link to="/signup"><span className='text-blue-500'>SignUp</span></Link> </p>
                </div>
                {
                    message ?
                        <p className='text-red-900 text-center' >{message}</p>
                        :
                        ""
                }
            </form>
        </div>
    );
}

export default SignUp;