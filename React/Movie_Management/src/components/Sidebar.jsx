import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, moviesByGenre } from "../features/Movies/movieSlice";

const SidebarFilter = ({ setSelectedGenre, selectedGenre, setPage, page, handlepageChange }) => {
    const dispatch = useDispatch();
    const { genres } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        setPage(1);
        // handlepageChange(genreId)
        dispatch(moviesByGenre({ genreId, page: 1 }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-64 p-4 rounded-xl shadow-lg h-[calc(100vh-7rem)] fixed z-55 overflow-y-auto scrollbar">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                Filter by Genre
            </h2>
            <ul className="space-y-2">
                {genres.map((genre) => (
                    <li
                        key={genre.id}
                        onClick={() => handleGenreClick(genre.id)}
                        className={`cursor-pointer px-3 py-2 rounded-md transition-all duration-200 
                        ${selectedGenre === genre.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-700"
                            }`}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarFilter;
