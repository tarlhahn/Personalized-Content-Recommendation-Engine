// Mock data (meant to be illustrative, replace with real data sources)
const userProfiles = {
    "1": { name: "Alice", age: 30, preferences: ["sci-fi", "action"] },
    "2": { name: "Bob", age: 25, preferences: ["comedy", "drama"] },
    // ... other user profiles
};

const userInteractions = {
    "1": [{ contentId: "A", interaction: "like" }, { contentId: "B", interaction: "view" }],
    "2": [{ contentId: "B", interaction: "like" }, { contentId: "C", interaction: "view" }],
    // ... other user interactions
};

const contentMetadata = {
    "A": { title: "Star Wars", genre: "sci-fi" },
    "B": { title: "Inception", genre: "action" },
    "C": { title: "Titanic", genre: "drama" },
    // ... other content metadata
};

// Function to fetch user profile
function fetchUserProfiles() {
    return new Promise((resolve, reject) => {
        const userProfile = userProfiles;
        if (userProfile) {
            resolve(userProfile);
        } else {
            reject(new Error("User profile not found"));
        }
    });
}

// Function to fetch user interactions
function fetchUserInteractions() {
    return new Promise((resolve, reject) => {
        const interactions = userInteractions;
        if (interactions) {
            resolve(interactions);
        } else {
            reject(new Error("User interactions not found"));
        }
    });
}

// Function to fetch content metadata
function fetchContentMetadata() {
    return new Promise((resolve) => {
        resolve(contentMetadata);
    });
}

module.exports = {
    fetchUserProfiles,
    fetchUserInteractions,
    fetchContentMetadata,
};

