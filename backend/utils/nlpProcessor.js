const allGenres = ["sci-fi", "action", "comedy", "drama"]; // and any other genres

exports.extractFeatures = (data) => {
    try {
        let vector = [];

        // Check if data is an object and has a 'preferences' property
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid input data');
        } else if (data.preferences) {
            vector = allGenres.map(genre => data.preferences.includes(genre) ? 1 : 0);
        } 
        // Check if data is an object and has a 'genre' property (for contentMetadata)
        else if (data && typeof data === 'object' && data.genre) {
            vector = allGenres.map(genre => data.genre === genre ? 1 : 0);
        }
        else {
            console.log('Incomplete data set', data);
            throw new Error('Incomplete data set');
        }

        return vector;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

