import React from 'react';

/**
 * Tabs component to render tab buttons for navigation.
 *
 * @param {Object[]} tabs - An array of tab objects where each object has an 'id' and a 'name'.
 * @param {string} activeTab - The id of the currently active tab.
 * @param {function} setActiveTab - A function to set the active tab id.
 *
 * @returns {JSX.Element} - A React component rendering the tab buttons.
 */
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="flex mb-4">
            {tabs?.map((tab) => (
                <button
                    key={tab.id}
                    className={`text-2xl py-2 px-4 text-center font-medium ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
