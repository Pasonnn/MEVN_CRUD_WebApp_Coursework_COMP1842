<template>
  <div class="dashboard">
    <!-- Tab Menu with Role-based Visibility -->
    <nav class="tab-menu">
      <ul>
        <li @click="$router.push('/dashboard/words')" :class="{ active: $route.path === '/dashboard/words' }">Words</li>
        <li @click="$router.push('/dashboard/new')" :class="{ active: $route.path === '/dashboard/new' }">New</li>
        <li @click="$router.push('/dashboard/test')" :class="{ active: $route.path === '/dashboard/test' }">Test</li>
        <li @click="$router.push('/dashboard/profile')" :class="{ active: $route.path === '/dashboard/profile' }">Profile</li>

        <!-- Conditionally render the User Management tab if the user is an admin -->
        <li v-if="isAdmin" @click="$router.push('/dashboard/user-management')" :class="{ active: $route.path === '/dashboard/user-management' }">
          Management
        </li>
      </ul>
      <div class="tab-shadow" :style="{ left: shadowLeft + 'px', width: shadowWidth + 'px' }"></div>
    </nav>

    <!-- Tab Content -->
    <div class="tab-content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      activeTab: 'words', // Default active tab
      shadowLeft: 0, // Position of the shadow
      shadowWidth: 0, // Width of the shadow
    };
  },
  computed: {
    // Check if the user is an admin by fetching the role from localStorage
    isAdmin() {
      const role = localStorage.getItem('userRole');  // Assuming user role is stored in localStorage
      return role === 'admin';  // Show the User Management tab only if the role is 'admin'
    },
  },
};
</script>

<style scoped>
.dashboard {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ensure the dashboard takes full height of the viewport */
}

.tab-menu {
  background-color: #ffffff;
  padding: 2px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center; /* Vertically center the items */
  justify-content: center; /* Horizontally center the items */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 550px; /* Ensure it takes up full width */
  max-width: 1200px; /* Set a fixed maximum width to prevent it from expanding too much */
  margin: 0 auto; /* Center the tab menu in the middle of the screen */
}

.tab-menu ul {
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%; /* Ensure the menu takes full width */
  justify-content: center;
}

.tab-menu ul li {
  padding: 15px 25px;
  cursor: pointer;
  color: #333333;
  font-weight: bold;
  position: relative;
  transition: color 0.3s ease;
}

.tab-menu ul li:hover {
  color: #ff7a00;
}

.tab-menu ul li.active {
  color: #ff7a00;
}

.tab-menu .tab-shadow {
  position: absolute;
  bottom: 0;
  height: 5px;
  background-color: #ff7a00;
  border-radius: 5px 5px 0 0;
  transition: left 0.3s ease, width 0.3s ease;
}

.tab-content {
  margin-top: 20px;
  flex-grow: 1; /* Make the content take all available space */
  overflow-y: auto; /* Enable scrolling for content that overflows */
  padding: 20px; /* Optional padding for content */
  background-color: #f9f9f9;
}

</style>
