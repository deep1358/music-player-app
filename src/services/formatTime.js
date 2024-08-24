/**
 * Formats a duration in seconds into a minutes:seconds string.
 *
 * @param {number} seconds - The duration in seconds to be formatted.
 *
 * @returns {string} - A string representing the duration in the format "MM:SS".
 *                      If the input is not a valid number, it returns "0:00".
 */
export const formatTime = (seconds) => {
  // Ensure the input is a finite number
  if (!isFinite(seconds) || seconds < 0) {
      return '0:00'; // Return "0:00" for invalid or negative input
  }

  // Calculate the minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format the minutes and seconds into "MM:SS" format
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
