import React from 'react';

/**
 * MusicRow component displays individual music items in a list.
 * Each row shows the music cover, name, artist, and duration.
 * It highlights the currently playing music and triggers an action on click.
 *
 * @param {Object} props.item - The music item to be displayed.
 * @param {function} props.handleItemClick - Function to handle click events for the music item.
 * @param {Object} props.currentMusic - The currently playing music item.
 *
 * @returns {JSX.Element} - The rendered music row component.
 */
const MusicRow = ({ item, handleItemClick, currentMusic }) => {
    return (
        <button
            key={item.id}
            className="p-4 rounded flex justify-between items-center w-full text-left"
            style={{
                background: item.id === currentMusic?.id ? "rgba(255, 255, 255, 0.15)" : "transparent" // Highlight the current music
            }}
            onClick={() => handleItemClick(item)}
        >
            {/* Music Cover and Details */}
            <div className="flex">
                {/* Cover Image */}
                <img
                    src={item.cover}
                    alt={`${item.name} cover`}
                    className="w-14 h-14 object-cover rounded-full mr-4"
                />
                {/* Music Details */}
                <div className="flex flex-col">
                    <div className="text-xl text-gray-300">{item.name}</div>
                    <div className="text-gray-400">{item.artist}</div>
                </div>
            </div>
            {/* Duration */}
            <div className="text-gray-400">{item.duration}</div>
        </button>
    );
};

export default MusicRow;
