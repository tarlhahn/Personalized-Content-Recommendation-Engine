const dataPreprocessor = require('../utils/dataPreprocessor');

const { fetchUserProfiles } = require('../data/dataSource');

exports.getUserProfile = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);

        // Validate userId
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Fetch user profile from your data source
        const userProfiles = await fetchUserProfiles();
	const userProfile = userProfiles[userId];
	
        // Validate userProfile
        if (!userProfile || Object.keys(userProfile).length === 0) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        
        // Assume dataPreprocessor.preprocess is defined and works as expected
        const processedUserProfile = dataPreprocessor.preprocessData(userProfile);
        
        res.status(200).json({ processedUserProfile });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

