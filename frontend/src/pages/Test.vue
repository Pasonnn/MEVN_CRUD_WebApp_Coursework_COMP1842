<template>
    <div class="test">
      <h1>Language Test</h1>
  
      <!-- Instructions for the test -->
      <div class="instructions">
        <p>Translate the following words into German and French.</p>
        <p>If you don't know a word, try your best!</p>
      </div>
  
      <!-- Show the test words -->
      <div v-if="testWords.length > 0">
        <form @submit.prevent="submitTest">
          <div v-for="(word, index) in testWords" :key="word._id" class="test-word">
            <div class="word-item">
              <h2>{{ word.english }}</h2>
              
              <label for="german">German:</label>
              <input 
                type="text" 
                v-model="userAnswers[index].german" 
                required 
                placeholder="Enter German translation"
              />
              
              <label for="french">French:</label>
              <input 
                type="text" 
                v-model="userAnswers[index].french" 
                required 
                placeholder="Enter French translation"
              />
            </div>
          </div>
  
          <button type="submit" class="submit-button">Submit</button>
        </form>
      </div>
  
      <!-- Show the results after submission -->
      <div v-else>
        <p>There are not enough words in the database for the test. Please add more words.</p>
      </div>
  
      <!-- Show test results -->
      <div v-if="testResults !== null" class="test-results">
        <h2>Test Results</h2>
        <p>Correct Answers: {{ correctAnswers }} / {{ testWords.length * 2 }}</p>
        <div v-for="(word, index) in testWords" :key="index" class="result-item">
          <h3>{{ word.english }}</h3>
  
          <p :class="{'correct': isCorrect('german', index), 'incorrect': isIncorrect('german', index)}">
            <strong>German:</strong> Your answer: {{ userAnswers[index].german }} 
            <span v-if="isCorrect('german', index)" class="fa fa-check-circle correct"></span>
            <span v-if="isIncorrect('german', index)" class="fa fa-times-circle incorrect"></span>
            (Correct: {{ word.german }})
          </p>
  
          <p :class="{'correct': isCorrect('french', index), 'incorrect': isIncorrect('french', index)}">
            <strong>French:</strong> Your answer: {{ userAnswers[index].french }} 
            <span v-if="isCorrect('french', index)" class="fa fa-check-circle correct"></span>
            <span v-if="isIncorrect('french', index)" class="fa fa-times-circle incorrect"></span>
            (Correct: {{ word.french }})
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Test',
    data() {
      return {
        testWords: [], // Holds the randomly selected words for the test
        userAnswers: [], // Holds the user's answers
        testResults: null, // Holds the result after submitting
        correctAnswers: 0, // Count of correct answers
      };
    },
    mounted() {
      this.fetchWordsForTest();
    },
    methods: {
      // Fetch words from the database
      async fetchWordsForTest() {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to be logged in to take the test.');
          this.$router.push('/login');
          return;
        }
  
        try {
          const response = await axios.get('http://localhost:5000/records', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const allWords = response.data;
  
          // Randomly select 5 words (or fewer if not enough words)
          const selectedWords = this.selectRandomWords(allWords, 5);
  
          this.testWords = selectedWords;
          this.userAnswers = selectedWords.map(() => ({ german: '', french: '' }));
        } catch (error) {
          console.error('Error fetching words:', error);
          alert('There was an error fetching the words.');
        }
      },
  
      // Function to select random words
      selectRandomWords(words, count) {
        const shuffled = words.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      },
  
      // Submit the test and calculate results
      submitTest() {
        this.correctAnswers = 0;
  
        this.testResults = true;
  
        // Compare user answers with the correct ones
        this.userAnswers.forEach((answer, index) => {
          const correctWord = this.testWords[index];
          if (answer.german.toLowerCase() === correctWord.german.toLowerCase()) {
            this.correctAnswers++;
          }
          if (answer.french.toLowerCase() === correctWord.french.toLowerCase()) {
            this.correctAnswers++;
          }
        });
      },
  
      // Check if the answer is correct
      isCorrect(language, index) {
        const correctWord = this.testWords[index];
        const userAnswer = this.userAnswers[index][language];
        return userAnswer.toLowerCase() === correctWord[language].toLowerCase();
      },
  
      // Check if the answer is incorrect
      isIncorrect(language, index) {
        const correctWord = this.testWords[index];
        const userAnswer = this.userAnswers[index][language];
        return userAnswer && userAnswer.toLowerCase() !== correctWord[language].toLowerCase();
      }
    },
  };
  </script>
  
  <style scoped>
  .test {
    font-family: 'Arial', sans-serif;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .instructions {
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  .test-word {
    margin-bottom: 20px;
  }
  
  .test-word h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .test-word label {
    font-weight: bold;
  }
  
  .test-word input {
    padding: 8px;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #218838;
  }
  
  .test-results {
    margin-top: 20px;
    font-size: 18px;
  }
  
  .result-item {
    margin-bottom: 15px;
  }
  
  .result-item p {
    font-size: 16px;
  }
  
  .result-item h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .result-item .fa {
    margin-left: 10px;
  }
  
  .correct {
    color: green;
  }
  
  .incorrect {
    color: red;
  }
  </style>
  