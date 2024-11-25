<template>
    <div class="dashboard">
      <nav class="tab-menu">
        <ul>
          <li @click="$router.push('/dashboard/words')" :class="{ active: $route.path === '/dashboard/words' }">Words</li>
          <li @click="$router.push('/dashboard/new')" :class="{ active: $route.path === '/dashboard/new' }">New</li>
          <li @click="$router.push('/dashboard/test')" :class="{ active: $route.path === '/dashboard/test' }">Test</li>
          <li @click="$router.push('/dashboard/profile')" :class="{ active: $route.path === '/dashboard/profile' }">Profile</li>
          <li @click="$router.push('/dashboard/user-management')" :class="{ active: $route.path === '/dashboard/user-management' }">User Management</li>
        </ul>
        <div class="tab-shadow" :style="{ left: shadowLeft + 'px', width: shadowWidth + 'px' }"></div>
      </nav>
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
        shadowLeft: 0,
        shadowWidth: 0,
      };
    },
    methods: {
      updateShadowPosition() {
        const activeTab = this.$el.querySelector('.tab-menu ul li.active');
        if (activeTab) {
          this.shadowLeft = activeTab.offsetLeft;
          this.shadowWidth = activeTab.offsetWidth;
        }
      },
    },
    watch: {
      '$route.path': 'updateShadowPosition',
    },
    mounted() {
      this.updateShadowPosition();
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    font-family: 'Arial', sans-serif;
  }
  
  .tab-menu {
    background-color: #ffffff;
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .tab-menu ul {
    list-style-type: none;
    display: flex;
    padding: 0;
    margin: 0;
    position: relative;
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
  }
  </style>
  
