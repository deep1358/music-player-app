import React from 'react';
import logo from '../assets/Logo.svg';
import avatar from '../assets/Avatar.svg';
import { FaBars, FaTimes } from 'react-icons/fa';

/**
 * Sidebar component displays the application logo, a toggle button for mobile navigation,
 * and an avatar image. The component adapts its layout based on the screen size.
 *
 * @param {boolean} props.isOpen - Indicates if the menu is open.
 * @param {function} props.toggleMenu - Function to toggle the menu open/closed state.
 *
 * @returns {JSX.Element} - The rendered sidebar component.
 */
const Sidebar = ({ isOpen, toggleMenu }) => {
  return (
    <div className="flex lg:flex-col lg:h-screen p-4">
      {/* Logo Section */}
      <div className="flex items-center">
        {/* Toggle Button for Mobile View */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-white mr-4 transition-transform duration-300 ease-in-out transform"
            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Logo Image */}
        <img src={logo} alt="Logo" className="w-30 h-auto" />
      </div>

      {/* Spacer to push avatar to bottom */}
      <div className="flex-grow"></div>

      {/* Avatar Section */}
      <div className="flex items-center mb-4">
        <img src={avatar} alt="Avatar" className="w-18 h-auto" />
      </div>
    </div>
  );
};

export default Sidebar;
