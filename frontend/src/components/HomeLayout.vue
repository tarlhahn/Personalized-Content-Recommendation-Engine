<template>
  <div>
    <h1>Welcome to Our Content Platform</h1>
    <p>Explore personalized content recommendations just for you!</p>
    <router-link :to="{ name: 'Recommendations', params: { userId: userId } }">View Recommendations</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '1' // Example user ID
    };
  }
};
</script>

