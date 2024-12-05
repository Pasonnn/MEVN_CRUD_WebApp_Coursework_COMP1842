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
  overflow: auto; /* Allow scrolling on the body */
}

/* App container */
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start; /* Align to the top so it can scroll down */
  justify-content: center; /* Center horizontally */
  position: relative; /* Allow scrolling inside the container */
  background-color: white;
  overflow: auto; /* Enable scrolling inside the container */
  padding: 10px; /* Optional padding */
  box-sizing: border-box; /* Include padding in the width and height calculation */
}

/* Center login/signup form */
.login-signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Take full height of the screen */
}

form {
  width: 100%;
  max-width: 400px; /* Form will not grow larger than this width */
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Prevent focus outline for the app container */
.app-container:focus {
  outline: none;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column; /* Stack content vertically on small screens */
    padding: 15px; /* Increase padding for smaller screens */
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 20px; /* More padding on smaller screens */
  }
}
</style>
