import React from "react";
import { Link } from "react-router";

const MovieCard = ({ id, title, name, poster_path, release_date, first_air_date, vote_average, media_type }) => {
    const formatRating = (rating) => (rating ? rating.toFixed(1) : "NR");
    const formatDate = (dateString) => {
        if (!dateString) return "TBA";
        return new Date(dateString).getFullYear();
    };

    const isTV = media_type === "tv" || !!name;
    const finalTitle = title || name;
    const finalDate = release_date || first_air_date;

    const linkPath = isTV ? `/tv/${id}` : `/movie/${id}`;

    return (
        <Link to={linkPath} className="group">
            <div className="w-56 h-96 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 dark:bg-gray-800 overflow-hidden">
                {/* Poster Container */}
                <div className="relative overflow-hidden">
                    <img
                        src={
                            poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : "/placeholder-movie.jpg"
                        }
                        alt={finalTitle}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Content */}
                <div className="p-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {finalTitle}
                    </h3>

                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
                        <span>{formatDate(finalDate)}</span>
                        <span className="flex items-center gap-1">
                            ⭐ {formatRating(vote_average)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
