import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const apiCallToGetUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

export const apiCallToGetRecommendations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    throw error;
  }
};

