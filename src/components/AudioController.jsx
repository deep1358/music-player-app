import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaEllipsisH, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // Font Awesome icons

/**
 * AudioController handles the audio playback and controls.
 * It includes play/pause, next/previous song, volume control, and seeking functionality.
 *
 * @param {Object} props.currentMusic - The currently selected music track
 * @param {React.RefObject<HTMLAudioElement>} props.audioRef - Ref to the HTML audio element
 * @param {boolean} props.isPlaying - State indicating if the music is currently playing
 * @param {Function} props.setIsPlaying - Function to set the playing state
 * @param {Function} props.setCurrentMusic - Function to set the currently selected music track
 * @param {Array<Object>} props.filteredMusic - List of filtered music tracks
 *
 * @returns {JSX.Element} - The rendered AudioController component
 */
const AudioController = ({
    currentMusic,
    audioRef,
    isPlaying,
    setIsPlaying,
    setCurrentMusic,
    filteredMusic
}) => {

    // State for volume control
    const [volume, setVolume] = useState(1);

    // State to show/hide the volume slider
    const [showSlider, setShowSlider] = useState(false);

    // State to keep track of current playback time
    const [currentTime, setCurrentTime] = useState(0);

    // State to keep track of the total duration of the track
    const [duration, setDuration] = useState(0);

    // State to keep the width of the current seeker
    const [seekerWidth, setSeekerWidth] = useState(0);

    // Ref for seeker width
    const seekerRef = useRef(null);

    /**
     * Toggles between play and pause based on the isPlaying state.
     *
     * @param {boolean} isPlaying - The current playing state of the audio
     */
    const playPauseHandler = (isPlaying) => {
        // Play/pause only if audio is loaded
        if(audioRef.current.src){
            if (isPlaying) {
                audioRef.current?.pause();
            } else {
                audioRef.current?.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // Pause or play audio when currentMusic changes
        playPauseHandler(false);
    }, [currentMusic]);

    /**
     * Advances to the next track in the filteredMusic list.
     */
    const nextSongHandler = () => {
        setCurrentMusic((prevSong) =>
            prevSong.id < filteredMusic.length - 1 ? filteredMusic[+prevSong.id + 1] : filteredMusic[0]
        );
        setIsPlaying(false);
    };

    /**
     * Goes back to the previous track in the filteredMusic list.
     */
    const prevSongHandler = () => {
        setCurrentMusic((prevSong) =>
            prevSong.id > 0 ? filteredMusic[+prevSong.id - 1] : filteredMusic[filteredMusic.length - 1]
        );
        setIsPlaying(false);
    };

    /**
     * Handles changes in the volume slider.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by changing the slider
     */
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume; // Adjust the volume of the audio element
        }
    };

    /**
     * Updates the current playback time state.
     */
    const timeUpdateHandler = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    /**
     * Updates the total duration state when metadata is loaded.
     */
    const durationChangeHandler = () => {
        setDuration(audioRef.current.duration);
    };

    /**
     * Advances to the next track when the current track ends.
     */
    const songEndHandler = () => {
        nextSongHandler();
    };

    useEffect(() => {
        // Update seeker width on mount and resize
        const updateSeekerWidth = () => {
            setSeekerWidth(seekerRef.current?.offsetWidth);
        };
        updateSeekerWidth();
        window.addEventListener('resize', updateSeekerWidth);
        return () => window.removeEventListener('resize', updateSeekerWidth);
    }, [currentMusic]);

    /**
     * Handles seeking through the track by clicking on the seeker.
     *
     * @param {React.MouseEvent<HTMLDivElement>} e - The event triggered by clicking the seeker
     */
    const handleSeek = (e) => {
        const clickPosition = e.nativeEvent.offsetX;
        const newTime = (clickPosition / seekerWidth) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    /**
     * Handles dragging the seeker thumb to seek through the track.
     *
     * @param {React.MouseEvent<HTMLDivElement>} e - The event triggered by dragging the seeker thumb
     */
    const handleThumbDrag = (e) => {
        const clickPosition = e.nativeEvent.offsetX;
        const newTime = (clickPosition / seekerWidth) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div style={{
            pointerEvents: !currentMusic ? "none" : "auto"
        }} className="w-full flex flex-col">
            <audio
                ref={audioRef}
                src={currentMusic?.url}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={durationChangeHandler}
                onEnded={songEndHandler}
            />

            <div className="w-full mt-4 flex lg:items-center">
                {/* Seeker */}
                <div
                    ref={seekerRef}
                    className="relative w-full h-2 rounded-full cursor-pointer"
                    style={{
                        backgroundColor: "rgb(64,64,64)"
                    }}
                    onClick={handleSeek}
                >
                    <div
                        className="absolute top-0 left-0 h-full bg-white rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                    <div
                        className="absolute top-0 -mt-1.5 rounded-full cursor-pointer"
                        style={{ left: `${(currentTime / duration) * 100}%` }}
                        onMouseDown={handleThumbDrag}
                    ></div>
                </div>
            </div>

            <div className="flex items-center justify-between space-x-4 mt-5">
                <div
                    className='flex items-center justify-center p-4 rounded-full cursor-pointer text-white'
                    style={{
                        backgroundColor: "rgb(64,64,64)"
                    }}
                >
                    <FaEllipsisH />
                </div>
                <div className="flex">
                    <div
                        className='flex items-center justify-center mx-8 text-gray-300 rounded-full cursor-pointer'
                        onClick={prevSongHandler}>
                        <FaBackward />
                    </div>
                    <div
                        className='flex items-center justify-center p-4 bg-white rounded-full cursor-pointer'
                        onClick={() => playPauseHandler(isPlaying)}>
                        {
                            isPlaying ? <FaPause /> : <FaPlay />
                        }
                    </div>
                    <div
                        className='flex items-center justify-center mx-8 text-gray-300 rounded-full cursor-pointer'
                        onClick={nextSongHandler}>
                        <FaForward />
                    </div>
                </div>
                <div
                    className='flex items-center justify-center p-4 rounded-full cursor-pointer text-white relative'
                    style={{ backgroundColor: 'rgb(64,64,64)' }}
                    onClick={() => {
                        setShowSlider(prev => !prev)
                    }}
                >
                    {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />} {/* Change icon based on volume */}
                    {/* Volume Slider */}
                    {showSlider && (
                        <div className="absolute z-10" style={{ top: '-25px', left: '221%', transform: 'translateX(-50%)' }}>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                                style={{
                                    transform: 'rotate(-90deg)',
                                    transformOrigin: 'left bottom',
                                    width: '150px',
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AudioController;
