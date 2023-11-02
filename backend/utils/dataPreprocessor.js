const pd = require('pandas-js');

exports.preprocessData = (data) => {
    try {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid input data');
        }

        // Check if data is a single object and convert it to an array for DataFrame compatibility
        const isSingleObject = !Array.isArray(data);
        if (isSingleObject) {
            data = [data];
        }

        // Create a DataFrame
        let df = new pd.DataFrame(data);

        // Convert DataFrame back to JavaScript object(s)
        const preprocessedData = df.to_json({ orient: 'records' });

        // If the original input data was a single object, return a single object
        return isSingleObject ? preprocessedData[0] : preprocessedData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

