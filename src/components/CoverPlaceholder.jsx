import React from 'react';

/**
 * CoverPlaceholder component is a placeholder for the music cover image.
 * It provides a visual representation when no cover image is available.
 *
 * @returns {JSX.Element} - The rendered CoverPlaceholder component
 */
const CoverPlaceholder = () => {
    return (
        <div
            className="rounded dark:bg-gray-700 mb-4"
            style={{
                height: "55vh",
                width: "100%"
            }}
        >
        </div>
    );
};

export default CoverPlaceholder;
