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
/* Reset styles */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto; /* Allow scrolling on the body */
}

/* App container */
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start; /* Align to the top so it can scroll down */
  justify-content: center;
  position: relative; /* Allow scrolling inside the container */
  background-color: white;
  overflow: auto; /* Enable scrolling inside the container */
  padding: 20px; /* Optional padding */
}

/* Prevent focus outline for the app container */
.app-container:focus {
  outline: none;
}

</style>
