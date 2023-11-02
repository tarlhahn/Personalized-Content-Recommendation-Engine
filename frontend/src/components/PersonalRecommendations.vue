<template>
  <div>
    <h1>Recommended Content for {{ userProfile.name }}</h1>
    <ul v-if="recommendations.length">
      <li v-for="content in recommendations" :key="content.itemIndex">
        {{ content.itemIndex }}
      </li>
    </ul>
    <p v-else>No recommendations available.</p>
  </div>
</template>

<script>
import { apiCallToGetUserProfile, apiCallToGetRecommendations } from '@/api';

export default {
  data() {
    return {
      userProfile: {},
      recommendations: []
    };
  },
  async created() {
    const userId = this.$route.params.userId;
    try {
      let profile = await apiCallToGetUserProfile(userId);
      this.userProfile = profile.processedUserProfile;
      let receivedRecommendations = await apiCallToGetRecommendations(userId);
      this.recommendations = receivedRecommendations.recommendations;
      console.log("recommendations", this.recommendations);
    } catch (error) {
      console.error('Data fetching failed:', error);
      // Handle error appropriately, e.g., show a user-friendly error message
    }
  }
};
</script>

