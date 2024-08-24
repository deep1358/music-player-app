import React from 'react';
import MusicListSkeleton from './MusicListSkeleton';
import SearchBar from './SearchBar';
import Tabs from './Tabs';
import MusicRow from './MusicRow';

/**
 * MusicList component displays a list of music items with search and tab functionalities.
 * It shows a skeleton screen while the music data is loading.
 *
 * @param {string} props.searchTerm - The current search term for filtering music
 * @param {Function} props.setSearchTerm - Function to update the search term
 * @param {Array} props.music - The full list of music items
 * @param {Array} props.filteredMusic - The list of music items filtered based on the search term
 * @param {string} props.activeTab - The currently active tab ID
 * @param {Function} props.setActiveTab - Function to update the active tab
 * @param {Array} props.tabs - The list of tabs to display
 * @param {Object} props.currentMusic - The currently selected music item
 * @param {Function} props.setCurrentMusic - Function to update the currently selected music item
 *
 * @returns {JSX.Element} - The rendered MusicList component
 */
const MusicList = ({
    searchTerm,
    setSearchTerm,
    music,
    filteredMusic,
    activeTab,
    setActiveTab,
    tabs,
    currentMusic,
    setCurrentMusic
}) => {

    /**
     * Handle the click event on a music item.
     *
     * @param {Object} music - The music item that was clicked
     */
    const handleItemClick = (music) => {
        setCurrentMusic(music);
    }

    return (
        <div className="p-4">
            {/* Tabs Component */}
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Search Bar Component */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Music List */}
            <div className="space-y-4 overflow-y-scroll" style={{ height: "80vh" }}>
                {
                    music.length > 0 ? (
                        filteredMusic.map((item) => (
                            <MusicRow
                                key={item.id}
                                item={item}
                                handleItemClick={handleItemClick}
                                currentMusic={currentMusic}
                            />
                        ))

                    ) : (
                        <MusicListSkeleton/>
                    )
                }
            </div>
        </div>
    );
};

export default MusicList;
