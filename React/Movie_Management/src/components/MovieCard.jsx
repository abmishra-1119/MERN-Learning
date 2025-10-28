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
            <div
                className="
                    bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl 
                    transition-all duration-300 overflow-hidden 
                    w-full sm:w-42 md:w-48 lg:w-56
                    h-[320px] sm:h-[340px] md:h-[370px] lg:h-[400px]
                    flex flex-col
                "
            >
                {/* Poster */}
                <div className="relative overflow-hidden flex-shrink-0">
                    <img
                        src={
                            poster_path
                                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                : "/NotFound.png"
                        }
                        alt={finalTitle}
                        className="
                            w-full h-[230px] sm:h-[250px] md:h-[270px] lg:h-[290px] 
                            object-cover group-hover:scale-105 transition-transform duration-300
                        "
                    />
                </div>

                {/* Details */}
                <div className="p-2 sm:p-3 flex flex-col justify-between flex-grow">
                    <h3
                        className="
                            font-semibold text-gray-900 dark:text-white 
                            text-xs sm:text-sm md:text-base mb-1 sm:mb-2 
                            line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 
                            transition-colors
                        "
                    >
                        {finalTitle}
                    </h3>

                    <div
                        className="
                            flex justify-between items-center 
                            text-[10px] sm:text-xs text-gray-600 dark:text-gray-400
                        "
                    >
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
