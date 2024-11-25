<template>
    <div class="words">
      <h1>Words</h1>
      <table class="words-table">
        <thead>
          <tr>
            <th><span class="flag-icon">\ud83c\uddec\ud83c\udde7</span> English</th>
            <th><span class="flag-icon">\ud83c\udde9\ud83c\uddea</span> German</th>
            <th><span class="flag-icon">\ud83c\uddf0\ud83c\uddf7</span> Korean</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, index) in words" :key="index">
            <td>{{ word.english }}</td>
            <td>{{ word.german }}</td>
            <td>{{ word.korean }}</td>
            <td>
              <button class="action-button show-button" @click="showWord(word)">Show</button>
              <button class="action-button edit-button" @click="editWord(word)">Edit</button>
              <button class="action-button delete-button" @click="deleteWord(index)">Destroy</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Words',
    data() {
      return {
        words: [
          { english: 'Cat', german: 'Katze', korean: 'Meow' },
          { english: 'Dog', german: 'Hund', korean: 'kr Dog' },
          { english: 'English', german: 'German', korean: 'Korean' },
          { english: 'def', german: 'abc', korean: 'ghk' },
          { english: '8386', german: '6789', korean: '78910' },
        ],
      };
    },
    methods: {
      showWord(word) {
        alert(`Showing details for ${word.english}`);
      },
      editWord(word) {
        alert(`Editing word: ${word.english}`);
      },
      deleteWord(index) {
        this.words.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .words {
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .words-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .words-table th,
  .words-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  .words-table th {
    background-color: #f9f9f9;
    font-weight: bold;
  }
  
  .flag-icon {
    margin-right: 8px;
  }
  
  .action-button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    margin-right: 10px;
    font-size: 14px;
  }
  
  .action-button:hover {
    text-decoration: underline;
  }
  
  .show-button {
    color: #007bff;
  }
  
  .edit-button {
    color: #28a745;
  }
  
  .delete-button {
    color: #dc3545;
  }
  </style>