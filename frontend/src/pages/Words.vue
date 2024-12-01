<template>
  <div class="words">
    <h1>Words</h1>

    <!-- Search Bar -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search words..." 
        @input="filterWords"
      />
    </div>

    <table class="words-table">
      <thead>
        <tr>
          <th><span class="flag-icon">🇬🇧</span> English</th>
          <th><span class="flag-icon">🇩🇪</span> German</th>
          <th><span class="flag-icon">🇫🇷</span> French</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(word, index) in filteredWords" :key="word._id">
          <!-- Display word information, click to navigate to details -->
          <td v-if="editingRow !== word._id">
            {{ word.english }}
          </td>
          <td v-else>
            <input v-model="editedWord.english" type="text" />
          </td>

          <td v-if="editingRow !== word._id">
            {{ word.german }}
          </td>
          <td v-else>
            <input v-model="editedWord.german" type="text" />
          </td>

          <td v-if="editingRow !== word._id">
            {{ word.french }}
          </td>
          <td v-else>
            <input v-model="editedWord.french" type="text" />
          </td>

          <td>
            <!-- Action buttons aligned neatly in a row -->
            <div class="action-buttons">
              <!-- Details button -->
              <button 
                v-if="editingRow !== word._id" 
                class="action-button detail-button" 
                @click="openDictionary(word)">
                Details
              </button>

              <!-- Edit button -->
              <button 
                v-if="editingRow !== word._id" 
                class="action-button edit-button" 
                @click="editWord(word)">
                Edit
              </button>

              <!-- Done button -->
              <button 
                v-if="editingRow === word._id" 
                class="action-button done-button" 
                @click="doneEditing(word)">
                Done
              </button>

              <!-- Delete button -->
              <button 
                v-if="editingRow !== word._id" 
                class="action-button delete-button" 
                @click="deleteWord(word._id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Words',
  data() {
    return {
      words: [],
      filteredWords: [],
      searchQuery: '',
      editingRow: null, // Track which row is being edited
      editedWord: {
        english: '',
        german: '',
        french: '',
      },
    };
  },
  mounted() {
    // Fetch words data when component mounts
    this.fetchWords();
  },
  methods: {
    async fetchWords() {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        alert('You need to be logged in to view the words.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/records', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });
        this.words = response.data;
        this.filteredWords = response.data; // Initially, display all words
      } catch (error) {
        console.error("There was an error fetching words:", error);
      }
    },

    // Method to filter words based on search query
    filterWords() {
      const query = this.searchQuery.toLowerCase();
      this.filteredWords = this.words.filter((word) => {
        return (
          word.english.toLowerCase().includes(query) ||
          word.german.toLowerCase().includes(query) ||
          word.french.toLowerCase().includes(query)
        );
      });
    },

    // Open the dictionary for the selected word in a new tab
    openDictionary(word) {
      if (word && word.english) {
        const url = `https://dictionary.cambridge.org/dictionary/english/${word.english.toLowerCase()}`;
        window.open(url, '_blank'); // Open in a new tab
      }
    },

    editWord(word) {
      // Start editing this row
      this.editingRow = word._id;
      this.editedWord = { ...word }; // Copy the word's values to editedWord for editing
    },

    async doneEditing(word) {
      // Update the word with the edited values
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        alert('You need to be logged in to update the word.');
        return;
      }

      try {
        const response = await axios.put(`http://localhost:5000/records/${word._id}`, this.editedWord, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });

        // Update the word in the words list with the new values
        const index = this.words.findIndex((w) => w._id === word._id);
        this.words.splice(index, 1, response.data);

        // Reset the state
        this.editingRow = null;
        this.editedWord = { english: '', german: '', french: '' };
        this.filterWords(); // Re-filter words after editing
      } catch (error) {
        console.error("There was an error updating the word:", error);
        alert('Error updating word.');
      }
    },

    async deleteWord(wordId) {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        alert('You need to be logged in to delete a word.');
        return;
      }

      try {
        await axios.delete(`http://localhost:5000/records/${wordId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });

        // Remove the word from the local list after deletion
        this.words = this.words.filter(word => word._id !== wordId);
        this.filterWords(); // Re-filter words after deletion
        alert('Word deleted successfully');
      } catch (error) {
        console.error("There was an error deleting the word:", error);
        alert('Error deleting word.');
      }
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

.search-bar {
  margin-bottom: 15px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
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

.edit-button {
  color: #28a745;
}

.done-button {
  color: #007bff;
}

.done-button:hover {
  text-decoration: underline;
}

.delete-button {
  color: #dc3545;
}

.detail-button {
  color: #007bff;
}

.input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button {
  font-size: 14px;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
