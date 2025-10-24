import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../features/Auth/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, message, isLoading } = useSelector(state => state.users);

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate]);

    // Handle login
    const handleLogin = useCallback(async (formData) => {
        try {
            const res = await dispatch(loginUser(formData));
            if (loginUser.fulfilled.match(res)) {
                alert('Login Successful!');
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }, [dispatch, navigate]);

    // Submit handler
    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(form);
    };

    // Input handler
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div
            className="h-screen flex justify-center items-center"
            style={{
                backgroundImage: `url('./loginbg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute opacity-50 bg-black w-full h-screen"></div>

            <form
                onSubmit={onSubmit}
                className="w-96 p-8 rounded-lg shadow-xl bg-gray-800  border border-gray-700 relative z-10"
            >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

                {/* Username */}
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
                        Username
                    </label>
                    <input
                        name="username"
                        type="text"
                        id="username"
                        value={form.username}
                        onChange={onChange}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        id="password"
                        value={form.password}
                        onChange={onChange}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                {/* SignUp Link */}
                <div className="mt-4 text-center">
                    <p className="text-white text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:text-blue-400">
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Message */}
                {message && (
                    <p className="text-center mt-4 text-sm text-red-400">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
