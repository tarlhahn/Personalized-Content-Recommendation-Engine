const dataPreprocessor = require('../utils/dataPreprocessor');
const HybridModel = require('../algorithms/hybrid_model');
const {
    fetchUserProfiles,
    fetchUserInteractions,
    fetchContentMetadata,
} = require('../data/dataSource');

exports.getRecommendations = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);

        // Validate userId
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Fetch user profile, user interactions, and content metadata from your data source
        const userProfiles = await fetchUserProfiles();
        const userInteractions = await fetchUserInteractions();
        const contentMetadata = await fetchContentMetadata();

        const userIndex = 1;
        const topN = 10;
        const recommendations = new HybridModel(userProfiles, contentMetadata, userInteractions).recommendItems(userId, topN);
	console.log("recommendations", recommendations);

        // Validate recommendations
        if (!Array.isArray(recommendations)) {
            return res.status(500).json({ error: 'Failed to generate recommendations' });
        }

        res.status(200).json({ recommendations });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

