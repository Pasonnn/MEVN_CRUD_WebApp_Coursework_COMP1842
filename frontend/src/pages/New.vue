<template>
    <div class="new-word">
      <h1>Add New Word</h1>
      <form @submit.prevent="addNewWord">
        <div class="form-group">
          <label for="english">English</label>
          <input type="text" v-model="newWord.english" id="english" required />
        </div>
        <div class="form-group">
          <label for="german">German</label>
          <input type="text" v-model="newWord.german" id="german" required />
        </div>
        <div class="form-group">
          <label for="french">French</label>
          <input type="text" v-model="newWord.french" id="french" required />
        </div>
        <button type="submit">Add Word</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'New',
    data() {
      return {
        newWord: {
          english: '',
          german: '',
          french: '',
        },
        error: null,
      };
    },
    methods: {
      async addNewWord() {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
        if (!token) {
          this.error = "You must be logged in to add a word.";
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:5000/records', this.newWord, {
            headers: {
              Authorization: `Bearer ${token}`,  // Add the token to the Authorization header
            },
          });
          alert('Word added successfully');
          this.$router.push('/dashboard/words'); // Redirect to words page
        } catch (error) {
          console.error('There was an error adding the word:', error);
          this.error = "There was an error adding the word.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .new-word {
    font-family: 'Arial', sans-serif;
    width: 300px;
    margin: 0 auto;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    font-size: 16px;
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 16px;
    background-color: orange;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: orangered
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  