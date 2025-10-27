import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/Auth/userSlice";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.users);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(logout());
        navigate("/login");
        setDropdownOpen(false);
    };

    const DropdownFunc = () => {
        setDropdownOpen(false);
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 h-20 shadow-md sticky top-0 left-0 right-0 z-50">
            <div className="max-w-screen flex items-center justify-between mx-auto px-6 h-full">
                <Link
                    onClick={DropdownFunc}
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="/logo.png"
                        className="h-10 object-cover"
                        alt="CineVerse Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        CineVerse
                    </span>
                </Link>

                <div className="flex items-center space-x-6">
                    <form onSubmit={handleSearch} className="flex items-center">
                        <div className="relative focus:ring-blue-500 focus:border-blue-500">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <CiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-64 p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Search movies, TV shows..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-3 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600"
                        >
                            <CiSearch className="w-5 h-5" />
                        </button>
                    </form>

                    <ul className="flex space-x-8 rtl:space-x-reverse items-center justify-center">
                        <li>
                            <Link
                                onClick={DropdownFunc}
                                to="/"
                                className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 font-medium"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={DropdownFunc}
                                to="/movies"
                                className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 font-medium"
                            >
                                Movies
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={DropdownFunc}
                                to="/tv-shows"
                                className="block py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500 font-medium"
                            >
                                TV Shows
                            </Link>
                        </li>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
                                >
                                    <FaUserCircle size={20} />
                                    <span>{user.username}</span>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                                        <Link
                                            onClick={DropdownFunc}
                                            to="/profile"
                                            className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <li>
                                <Link to="/login">
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                        Login
                                    </button>
                                </Link>
                            </li>
                        )}

                        <li>
                            <button
                                onClick={toggleTheme}
                                className="text-gray-900 dark:text-yellow-400 text-xl py-2.5"
                            >
                                {theme === "light" ? <FaMoon /> : <FaSun />}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
