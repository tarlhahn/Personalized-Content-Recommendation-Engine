const similarity = require('compute-cosine-similarity');

const interactionEncoding = {
    "like": 1,
    "view": 0.5,
    "dislike": 0,
    // Add more interactions as needed
};

class CollaborativeFiltering {
    constructor(userItemMatrix) {
        this.contentIds = this.getContentIds(userItemMatrix);
        this.userItemMatrix = this.processUserItemMatrix(userItemMatrix);
    }
    
    getContentIds(userItemMatrix) {
        let contentIds = {};
        for(let i in userItemMatrix){
          for(let e in userItemMatrix[i]) {
            contentIds[userItemMatrix[i][e].contentId] = true;
          }
        }
        return Object.keys(contentIds);
    }
    
    processUserItemMatrix(userItemMatrix) {
        let matrix = {};
        for(let i in userItemMatrix){
          let similarityVector = this.contentIds.map(contentId => {
            const interaction = userItemMatrix[i].find(rating => rating.contentId === contentId)?.interaction;
            return interactionEncoding[interaction] || 0;
          });
          matrix[i] = similarityVector;
        }
        return matrix;
    }

    // Compute similarity between two users
    computeUserSimilarity(user1Index, user2Index) {
        const user1Ratings = this.userItemMatrix[user1Index] || [];
        const user2Ratings = this.userItemMatrix[user2Index] || [];
        return similarity(user1Ratings, user2Ratings);
    }

    // Get top N similar users to the target user
    getSimilarUsers(targetUserIndex, topN = 5) {
        const usersSimilarity = [];
        for(let i in this.userItemMatrix) {
            if (i !== targetUserIndex) {
                const sim = this.computeUserSimilarity(targetUserIndex, i);
                usersSimilarity.push({ userIndex: i, similarity: sim });
            }
        }
        return usersSimilarity.sort((a, b) => b.similarity - a.similarity).slice(0, topN);
    }

    // Predict the rating that a user would give to an item
    predictRating(userIndex, itemIndex, topN = 5) {
        const similarUsers = this.getSimilarUsers(userIndex, topN);
        let weightedSum = 0;
        let similaritySum = 0;

        for (const user of similarUsers) {
            const userItem = this.userItemMatrix[user.userIndex];
            const userRating = userItem ? userItem[parseInt(itemIndex)] : null;
            if (userRating !== null && userRating !== undefined) {  // Ensure the user has rated the item
                weightedSum += user.similarity * userRating;
                similaritySum += user.similarity;
            }
        }

        return similaritySum === 0 ? null : weightedSum / similaritySum;
    }

    // Recommend top N items for the user
    recommendItems(userIndex, topN = 5) {
        const items = this.userItemMatrix[userIndex] ? this.userItemMatrix[userIndex].map((_, index) => index) : [];
        const predictedRatings = items.map(itemIndex => ({
            itemIndex,
            score: this.predictRating(userIndex, itemIndex)
        }));
        
        let predictedRatingsResult = predictedRatings
            .filter(item => item.score !== null && item.score !== undefined)
            .sort((a, b) => b.score - a.score)
            .slice(0, topN);
            
        return predictedRatingsResult;
    }
}

module.exports = CollaborativeFiltering;

