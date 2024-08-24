import React from 'react';

/**
 * MusicListSkeleton component displays a placeholder for the music list while data is loading.
 * It simulates the layout of a list item with a skeleton screen to improve user experience.
 *
 * @returns {JSX.Element} - The rendered skeleton screen for music list items.
 */
const MusicListSkeleton = () => {
    return (
        <div className="min-h-screen p-4">
            {/* Placeholder for music list items */}
            <div className="rounded flex justify-between items-center h-20 bg-gray-300 dark:bg-gray-800 w-full mb-8"></div>
            <div className="rounded flex justify-between items-center h-20 bg-gray-300 dark:bg-gray-800 w-full mb-8"></div>
            <div className="rounded flex justify-between items-center h-20 bg-gray-300 dark:bg-gray-800 w-full mb-8"></div>
            <div className="rounded flex justify-between items-center h-20 bg-gray-300 dark:bg-gray-800 w-full mb-8"></div>
        </div>
    );
};

export default MusicListSkeleton;
