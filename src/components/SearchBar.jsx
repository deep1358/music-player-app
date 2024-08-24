import React from 'react';
import { FaSearch } from 'react-icons/fa';

/**
 * SearchBar component provides a text input for searching songs and artists.
 * It includes an icon for visual indication of the search functionality.
 *
 * @param {string} props.searchTerm - The current value of the search input.
 * @param {function} props.setSearchTerm - Function to update the search term state.
 *
 * @returns {JSX.Element} - The rendered search bar component.
 */
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative flex-grow mb-4">
            {/* Search Input Field */}
            <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Song, Artist"
                style={{
                    background: "rgba(255, 255, 255, 0.15)" // Semi-transparent background
                }}
                className="w-full text-white pl-4 pr-10 py-4 rounded-lg placeholder-gray-300 focus:outline-none"
            />
            {/* Search Icon */}
            <FaSearch className="absolute size-5 right-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
        </div>
    );
};

export default SearchBar;
