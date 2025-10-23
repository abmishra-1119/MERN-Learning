import React from 'react';
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 h-20">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    {/* Logo/Brand Section */}
                    <Link
                        to="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="./logoicon.png"
                            className="h-8 object-c"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            CineVerse
                        </span>
                    </Link>

                    {/* Search and Menu Container */}
                    <div className="flex items-center space-x-4">

                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <CiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search..."
                            />
                        </div>

                        {/* Navigation Links (Now always visible and horizontal) */}
                        <ul className="flex space-x-8 rtl:space-x-reverse items-center">
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-blue-700 dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                                >
                                    Movies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                                >
                                    Tv Shows
                                </Link>
                            </li>
                            {/* <li>
                                <Link
                                    to="/"
                                    className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                                >
                                    SignUp
                                </Link>
                            </li> */}
                            <li>
                                <Link
                                    to="/login"
                                >
                                    <button className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
                                        Login
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;