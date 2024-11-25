<template>
  <div class="app-container">
    <transition name="fade-slide">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* General reset for the body and HTML */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: hidden; /* Prevents scrolling */
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f0f0f0;
}

/* Add transition effects */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
