const nlpProcessor = require('../utils/nlpProcessor');
const dataPreprocessor = require('../utils/dataPreprocessor');

class ContentBasedFiltering {
    constructor(userProfiles, itemProfiles) {
        this.userProfiles = userProfiles; // User profiles containing their preferences
        this.itemProfiles = itemProfiles; // Item profiles containing their attributes
    }

    // Compute the similarity between user preferences and item attributes
    computeSimilarity(userIndex, itemIndex) {
        const userPreferences = this.userProfiles[userIndex] || [];
        const itemAttributes = this.itemProfiles[itemIndex] || [];
        let similarity = 0;

        // Preprocess user preferences and item attributes
        const processedUserPreferences = dataPreprocessor.preprocessData(userPreferences);
        const processedItemAttributes = dataPreprocessor.preprocessData(itemAttributes);
	
        // Extract features using NLP for textual data within profiles
        const userFeatures = nlpProcessor.extractFeatures(processedUserPreferences);
        const itemFeatures = nlpProcessor.extractFeatures(processedItemAttributes);

        // Compute similarity
        // Here we'll use a simple dot product (potential others cosine similarity, Jaccard similarity, etc.)
        for (let i = 0; i < Math.min(userFeatures.length, itemFeatures.length); i++) {
            similarity += userFeatures[i] * itemFeatures[i];
        }

        return similarity;
    }

    // Recommend top N items for the user
    recommendItems(userIndex, topN = 5) {
        const items = Object.keys(this.itemProfiles).map(key => key);
        const predictedScores = items.map(itemIndex => ({
            itemIndex,
            score: this.computeSimilarity(userIndex, itemIndex)
        }));

        return predictedScores
            .sort((a, b) => b.score - a.score)
            .slice(0, topN);
    }
}

module.exports = ContentBasedFiltering;

