import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, moviesByGenre } from "../features/Movies/movieSlice";

const SidebarFilter = ({ setSelectedGenre, selectedGenre, setPage }) => {
    const dispatch = useDispatch();
    const { genres } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        setPage(1);
        dispatch(moviesByGenre({ genreId, page: 1 }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="bg-gray-800 text-white w-64 p-4 rounded-xl shadow-lg h-full overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Filter by Genre</h2>
            <ul className="space-y-2">
                {genres.map((genre) => (
                    <li
                        key={genre.id}
                        className={`cursor-pointer px-3 py-2 rounded-md hover:bg-gray-700 transition-all ${selectedGenre === genre.id ? "bg-blue-600" : "bg-gray-900"
                            }`}
                        onClick={() => handleGenreClick(genre.id)}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarFilter;
