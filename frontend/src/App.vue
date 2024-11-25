<template>
  <div class="app-container">
      <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Reset styles */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* App container */
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f0f0f0;
  overflow: hidden;
}

.app-container:focus {
  outline: none;
}

</style>
