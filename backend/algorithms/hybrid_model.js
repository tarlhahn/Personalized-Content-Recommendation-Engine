const CollaborativeFiltering = require('./collaborative_filtering');
const ContentBasedFiltering = require('./content_based_filtering');

class HybridModel {
    constructor(userProfiles, itemProfiles, userItemMatrix) {
        this.contentBasedFiltering = new ContentBasedFiltering(userProfiles, itemProfiles);
        this.collaborativeFiltering = new CollaborativeFiltering(userItemMatrix);
    }

    // Recommend top N items for the user
    recommendItems(userIndex, topN = 5) {
        const contentBasedRecommendations = this.contentBasedFiltering.recommendItems(userIndex, topN);
        const collaborativeRecommendations = this.collaborativeFiltering.recommendItems(userIndex, topN);

        // Combine the recommendations
        const combinedRecommendations = [...contentBasedRecommendations, ...collaborativeRecommendations];
	
        // Aggregate scores for items recommended by both models
        const scoresMap = combinedRecommendations.reduce((acc, { itemIndex, score }) => {
            acc[itemIndex] = (acc[itemIndex] || 0) + score;
            return acc;
        }, {});
        // Sort the items based on the aggregated scores and select top N items
        const recommendedItems = Object.entries(scoresMap)
            .map(([itemIndex, score]) => ({ itemIndex: itemIndex, score }))
            .sort((a, b) => b.score - a.score)
            .slice(0, topN);
        return recommendedItems;
    }
}

module.exports = HybridModel;

