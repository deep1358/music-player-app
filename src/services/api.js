/**
 * Fetches music data from a remote API.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to the music data as an array of objects.
 *                                If there is an error during the fetch operation, it returns an empty array.
 */
export const fetchMusicData = async () => {
  try {
      // Perform the fetch request to the music data API
      const response = await fetch('https://cms.samespace.com/items/songs');

      // Check if the response is okay (status in the range 200-299)
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();

      // Return the parsed data
      return data;
  } catch (error) {
      // Log the error to the console
      console.error('Error fetching music data: ', error);

      // Return an empty array if an error occurs
      return [];
  }
};
