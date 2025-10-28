import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/Auth/userSlice";
import { FaUserCircle, FaMoon, FaSun, FaFilm, FaTv } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const [showMobileSearch, setShowMobileSearch] = useState(false);
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
            setShowMobileSearch(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(logout());
        navigate("/login");
        setDropdownOpen(false);
    };

    const DropdownFunc = () => setDropdownOpen(false);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md sticky top-0 left-0 right-0 z-50">
            <div
                className="max-w-screen flex items-center justify-between mx-auto px-6 
                h-24 sm:h-20 transition-all duration-200"
            >
                {/* Logo */}
                <Link
                    onClick={DropdownFunc}
                    to="/"
                    className="flex items-center space-x-3"
                >
                    <img
                        src="/logo.png"
                        className="h-10 object-cover"
                        alt="CineVerse Logo"
                    />
                    {/* Hide app name on small screens */}
                    <span className="hidden sm:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        CineVerse
                    </span>
                </Link>

                {/* Desktop Search */}
                <form
                    onSubmit={handleSearch}
                    className="hidden md:flex items-center"
                >
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <CiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </div>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search movies, TV shows..."
                            className="
                                block w-64 p-3 ps-10 text-sm text-gray-900 border border-gray-300 
                                rounded-l-lg bg-gray-50 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 dark:text-white
                                transition-all duration-150"
                        />
                    </div>

                    <button
                        type="submit"
                        className="
                            p-3 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 
                            hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700
                        "
                    >
                        <CiSearch className="w-5 h-5" />
                    </button>
                </form>

                {/* Right side section */}
                <div className="flex items-center space-x-4 md:space-x-8">
                    {/* Mobile Icons */}
                    <div className="flex md:hidden items-center space-x-5">
                        <Link
                            to="/movies"
                            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <FaFilm size={22} />
                        </Link>

                        <Link
                            to="/tv-shows"
                            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <FaTv size={22} />
                        </Link>

                        {/* Mobile Search Icon */}
                        <button
                            onClick={() => setShowMobileSearch(true)}
                            className="text-gray-900 dark:text-white"
                        >
                            <CiSearch size={24} />
                        </button>
                    </div>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex space-x-8 items-center">
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
                    </ul>

                    {/* User Menu */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5"
                            >
                                <FaUserCircle size={20} />
                                <span className="hidden sm:inline">{user.username}</span>
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
                        <Link to="/login" className="hidden md:block">
                            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                Login
                            </button>
                        </Link>
                    )}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="text-gray-900 dark:text-yellow-400 text-xl py-2.5"
                    >
                        {theme === "light" ? <FaMoon /> : <FaSun />}
                    </button>
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <div className="absolute top-0 left-0 w-full h-24 bg-white dark:bg-gray-900 flex items-center justify-center px-4 z-50">
                    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <CiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search movies..."
                                className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowMobileSearch(false)}
                            className="ml-3 text-gray-700 dark:text-white"
                        >
                            <IoClose size={26} />
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
