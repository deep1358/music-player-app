import React, { useEffect, useRef, useState } from 'react';
import AudioController from './AudioController';
import CoverPlaceholder from './CoverPlaceholder';

/**
 * MusicDisplay component shows the current music details including the name, artist, cover image, and audio controls.
 * It also handles pausing and resuming the music when the browser tab visibility changes.
 *
 * @param {Object} props.currentMusic - The currently selected music item
 * @param {Function} props.setCurrentMusic - Function to update the currently selected music item
 * @param {Array} props.filteredMusic - The list of music items filtered based on the search term
 *
 * @returns {JSX.Element} - The rendered MusicDisplay component
 */
const MusicDisplay = ({ currentMusic, setCurrentMusic, filteredMusic }) => {

    // State to manage play/pause status of the music
    const [isPlaying, setIsPlaying] = useState(false);

    // Reference to the audio element
    const audioRef = useRef(null);

    /**
     * Effect to handle pausing and resuming of the audio based on tab visibility.
     * - Pauses the audio when the document is hidden
     * - Resumes playing if the document becomes visible and the audio was playing
     */
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                audioRef.current?.pause();
            } else if (!document.hidden && isPlaying) {
                audioRef.current?.play();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isPlaying]);

    return (
        <div
            style={{
                maxWidth: "600px"
            }}
            className="p-4 justify-center lg:min-h-screen flex flex-col items-center mx-auto my-0 flex-1">
            {
                currentMusic ? (
                    <>
                        <div className="flex flex-col w-full">
                            {/* Song Name */}
                            <div className="text-5xl font-semibold mb-2 text-white">
                                {currentMusic.name}
                            </div>

                            {/* Author Name */}
                            <div className="text-xl text-gray-400 mb-4">
                                {currentMusic.artist}
                            </div>
                        </div>

                        {/* Cover Image */}
                        <img
                            src={currentMusic.cover}
                            alt={`${currentMusic.name} cover`}
                            className="rounded mb-4"
                            style={{
                                height: "55vh",
                                width: "100%"
                            }}
                        />
                    </>
                ) : (
                    <CoverPlaceholder/>
                )
            }
            <AudioController
                currentMusic={currentMusic}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                setCurrentMusic={setCurrentMusic}
                filteredMusic={filteredMusic}
            />
        </div>
    );
};

export default MusicDisplay;
