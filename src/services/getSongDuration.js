/**
 * Retrieves the duration of an audio file from a given URL.
 *
 * @param {string} url - The URL of the audio file.
 *
 * @returns {Promise<number>} - A promise that resolves to the duration of the audio file in seconds.
 *                              If there is an error loading the audio, the promise is rejected with an error message.
 */
export const getSongDuration = (url) => {
    return new Promise((resolve, reject) => {
        // Create a new Audio object
        const audio = new Audio();

        // Set the audio source to the provided URL
        audio.src = url;

        // Event listener that resolves the promise with the audio duration when metadata is loaded
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration); // Resolving with the duration in seconds
        });

        // Event listener that rejects the promise if there's an error loading the audio
        audio.addEventListener('error', () => {
            reject('Error loading audio'); // Rejecting with an error message
        });
    });
};
