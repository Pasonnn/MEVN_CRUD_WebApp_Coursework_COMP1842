<template>
    <div class="login-container">
        <div class="left-panel">
            <div class="logo">
                <img src="../assets/duolingson_logo.png" alt="Your Logo">
            </div>
            <h1>Sign Into</h1>
            <h2>Your Account</h2>
            <form @submit.prevent="login">
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
                <div class="remember-me">
                    <input type="checkbox" id="remember-me">
                    <label for="remember-me">Remember Me</label>
                </div>
                <button type="submit" class="sign-in-button">Sign in</button>
                <router-link to="/signup">
                    <button type="button" class="sign-up-button">Sign up</button>
                </router-link>
            </form>
            <p v-if="error" class="error-message">{{ error }}</p>
        </div>
        <div class="right-panel">
            <div class="artwork">
                <img src="../assets/Artwork Poster.webp" alt="Artwork">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/users/login', {
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

.login-container {
    display: flex;
    width: 800px;
    height: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.left-panel {
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

h1 {
    font-size: 36px;
    font-weight: bold;
    color: #333333;
}

h2 {
    font-size: 24px;
    color: #555555;
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

.remember-me {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.remember-me input {
    margin-right: 10px;
}

.sign-in-button {
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

.sign-in-button:hover {
    background-color: #e03232;
}

.sign-up-button {
    width: 100%;
    padding: 15px;
    background-color: #ffffff;
    color: #f24444;
    font-size: 16px;
    font-weight: bold;
    border: 2px solid #f24444;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    margin-top: 10px;
}

.sign-up-button:hover {
    background-color: #f24444;
    color: #ffffff;
}

.right-panel {
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

.error-message {
    color: red;
    margin-top: 10px;
}

</style>