import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { registerUser } from '../features/Auth/userSlice';

const SignUp = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const { message, isLoading } = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate]);
    // Register user
    const handleRegister = useCallback(async (formData) => {
        try {
            const result = await dispatch(registerUser(formData));
            if (registerUser.fulfilled.match(result)) {
                alert('Registration successful!');
                navigate('/');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    }, [dispatch, navigate]);

    // Submit handler
    const onSubmit = (e) => {
        e.preventDefault();
        handleRegister(form);
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
            className='h-[calc(100vh-5rem)] flex justify-center items-center'
            style={{
                backgroundImage: `url('./loginbg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='absolute opacity-50 bg-black w-full h-[calc(100vh-5rem)]'></div>

            <form
                onSubmit={onSubmit}
                className="w-96 p-8 rounded-lg shadow-xl bg-gray-800 border border-gray-700 relative z-10"
            >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
                        Username
                    </label>
                    <input
                        name='username'
                        type="text"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter username"
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                        Email
                    </label>
                    <input
                        name='email'
                        type="email"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">
                        Phone
                    </label>
                    <input
                        name='phone'
                        type="tel"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter phone number"
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                        Password
                    </label>
                    <input
                        name='password'
                        type="password"
                        id="password"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********"
                        value={form.password}
                        onChange={onChange}
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-white">
                        Confirm Password
                    </label>
                    <input
                        name='confirmPassword'
                        type="password"
                        id="confirmPassword"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********"
                        value={form.confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="mt-4">
                    <p className='px-5 py-2.5 text-white text-sm text-center'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-blue-500 hover:text-blue-400'>
                            Login
                        </Link>
                    </p>
                </div>

                {message && (
                    <p className="text-center mt-4 text-sm text-red-400">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default SignUp;
