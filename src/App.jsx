import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MusicList from './components/MusicList';
import MusicDisplay from './components/MusicDisplay';
import { fetchMusicData } from './services/api';
import { getSongDuration } from './services/getSongDuration';
import { formatTime } from './services/formatTime';

// Tabs configuration for the application
const tabs = [
  { id: 'for-you', name: 'For You' },
  { id: 'top-tracks', name: 'Top Tracks' }
];

function App() {
  // State to store the list of music
  const [music, setMusic] = useState([]);

  // State to store the currently selected music
  const [currentMusic, setCurrentMusic] = useState(null);

  // State to store the search term input by the user
  const [searchTerm, setSearchTerm] = useState('');

  // State to store the active tab (either "For You" or "Top Tracks")
  const [activeTab, setActiveTab] = useState('for-you');

  // State to manage the opening and closing of the hamburger menu
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the hamburger menu open/close state
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Fetches music data and updates the music state
   * This effect runs once when the component is mounted
   */
  useEffect(() => {
    const fetchData = async () => {
      // Fetch the music data
      const data = await fetchMusicData();
      const tempMusic = [];
      let index = 0;

      // Process each music item and add it to tempMusic
      for (const item of data?.data) {
        // Fetch the duration of the song from its URL
        const duration = await getSongDuration(item.url);
        tempMusic.push({
          name: item.name,
          artist: item.artist,
          duration: formatTime(duration),
          url: item.url,
          accent: item.accent,
          cover: `https://cms.samespace.com/assets/${item.cover}`,
          id: index++
        });
      }

      // Update the music state with the processed music list
      setMusic(tempMusic);
    };

    fetchData();
  }, []);

  /**
   * Filters the music based on the search term
   * @returns {Array} - A list of music items that match the search term
   */
  const filteredMusic = music.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const artistMatch = item.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || artistMatch;
  });

  return (
    <div
      style={{
        background: currentMusic?.accent ?? "#121212",
      }}
      className="min-h-screen flex flex-col lg:flex-row lg:items-center lg:justify-center transition-colors duration-500 ease-in-out"
    >
      {/* Sidebar component */}
      <div className='lg:w-1/6'>
        <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>

      {/* MusicList component */}
      <div
        className={`lg:w-2/6 absolute lg:relative transition-colors duration-500 ease-in-out music-list ${isOpen && 'active'}`}
        style={{
          background: currentMusic?.accent ?? "#121212"
        }}
      >
        <MusicList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          music={music}
          filteredMusic={filteredMusic}
          setActiveTab={setActiveTab}
          tabs={tabs}
          activeTab={activeTab}
          currentMusic={currentMusic}
          setCurrentMusic={setCurrentMusic}
        />
      </div>

      {/* MusicDisplay component */}
      <div className='lg:w-3/6 w-full'>
        <MusicDisplay
          currentMusic={currentMusic}
          filteredMusic={filteredMusic}
          setCurrentMusic={setCurrentMusic}
        />
      </div>
    </div>
  );
}

export default App;
