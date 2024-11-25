<template>
  <div class="signup-container">
      <div class="left-panel">
          <div class="artwork">
              <!-- Artwork or placeholder for design -->
              <img src="../assets/Artwork Poster.webp" alt="Artwork">
          </div>
      </div>
      <div class="right-panel">
          <div class="logo">
              <img src="../assets/duolingson_logo.png" alt="Your Logo">
          </div>
          <h2>Create Your Account</h2>
          <form @submit.prevent="register">
              <div class="input-group">
                  <label for="name">
                      <span class="icon">👤</span>
                      <input v-model="name" type="text" id="name" placeholder="Full Name">
                  </label>
              </div>
              <div class="input-group">
                  <label for="email-id">
                      <span class="icon">✉️</span>
                      <input v-model="email" type="text" id="email-id" placeholder="Email">
                  </label>
              </div>
              <div class="input-group">
                  <label for="password">
                      <span class="icon">🔒</span>
                      <input v-model="password" type="password" id="password" placeholder="Password">
                  </label>
              </div>
              <button type="submit" class="sign-up-button">Sign up</button>
          </form>
          <p v-if="error" class="error-message">{{ error }}</p>
          <p class="have-account">
              Already have an account?
              <router-link to="/login" class="sign-in-link">Sign in</router-link>
          </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    name: '',
    email: '',
    password: '',
    error: null,
  };
},
methods: {
  async register() {
    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      localStorage.setItem('token', response.data.token); // Save token for authenticated requests
      this.$router.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      this.error = err.response?.data?.message || 'An error occurred';
    }
  },
},
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
}

body {
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.signup-container {
    display: flex;
    width: 800px;
    height: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.left-panel {
    flex: 1;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.artwork img {
    width: 90%;
    height: auto;
}

.right-panel {
    flex: 1;
    background-color: #ffffff;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.logo img {
    width: 100px;
    margin-bottom: 20px;
}

h2 {
    font-size: 30px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 20px;
}
.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: flex;
    align-items: center;
}

.input-group input {
    width: 100%;
    padding: 10px;
    margin-left: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.icon {
    font-size: 20px;
}

.sign-up-button {
    width: 100%;
    padding: 15px;
    background-color: #f24444;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.sign-up-button:hover {
    background-color: #e03232;
}

.have-account {
    margin-top: 20px;
    color: #555555;
    font-size: 14px;
}

.sign-in-link {
    color: #007bff;
    text-decoration: none;
    margin-left: 5px;
}

.sign-in-link:hover {
    text-decoration: underline;
}

.error-message {
    color: red;
    margin-top: 10px;
}

</style>