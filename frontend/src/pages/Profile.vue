<template>
    <div class="profile">
      <h1>Profile</h1>
  
      <!-- Profile Information Section -->
      <div v-if="user">
        <div class="profile-info">
          <!-- Avatar Section -->
          <div class="avatar-section">
            <!-- Display Avatar if it exists, otherwise show a placeholder -->
            <img v-if="user.avatar" :src="user.avatar" alt="User Avatar" class="avatar" />
            <div v-else class="avatar-placeholder">No Avatar</div>
          </div>
  
          <!-- Display User Information -->
          <div class="info">
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>
        </div>
  
        <!-- Profile Edit Form -->
        <form @submit.prevent="submitProfileChanges" enctype="multipart/form-data">
          <div class="form-group">
            <label for="name">Edit Name:</label>
            <input type="text" id="name" v-model="name" />
          </div>
  
          <div class="form-group">
            <label for="email">Edit Email:</label>
            <input type="email" id="email" v-model="email" />
          </div>
  
          <!-- Avatar Upload Section -->
          <div class="form-group">
            <label for="avatar">Change Avatar:</label>
            <input type="file" id="avatar" @change="handleAvatarChange" />
            <p v-if="avatarFile">Selected Avatar: {{ avatarFile.name }}</p>
          </div>
  
          <button type="submit" class="save-button">Save Changes</button>
        </form>
  
        <!-- Success/Error Messages -->
        <div v-if="message" class="message" :class="messageType">
          <p>{{ message }}</p>
        </div>
      </div>
  
      <!-- Loading Spinner -->
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Profile',
    data() {
      return {
        user: null, // Stores the current user data
        name: '',
        email: '',
        avatarFile: null,
        message: '', // Message for success or error
        messageType: '', // 'success' or 'error'
      };
    },
    mounted() {
      this.fetchProfile();
    },
    methods: {
      // Fetch the user's profile information
      async fetchProfile() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            this.$router.push('/login');
            return;
          }
  
          const response = await axios.get('http://localhost:5000/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          this.user = response.data; // Store user data
          this.name = this.user.name;
          this.email = this.user.email;
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      },
  
      // Handle avatar file change
      handleAvatarChange(event) {
        this.avatarFile = event.target.files[0];
      },
  
      // Submit profile changes (name, email, avatar)
      async submitProfileChanges() {
        try {
          const formData = new FormData();
          formData.append('name', this.name);
          formData.append('email', this.email);
          if (this.avatarFile) {
            formData.append('avatar', this.avatarFile);
          }
  
          const token = localStorage.getItem('token');
          if (!token) {
            this.$router.push('/login');
            return;
          }
  
          const response = await axios.put('http://localhost:5000/users/profile', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
  
          this.user = response.data.user; // Update the user data
          this.message = 'Profile updated successfully!';
          this.messageType = 'success';
        } catch (error) {
          console.error('Error updating profile:', error);
          this.message = 'Error updating profile. Please try again.';
          this.messageType = 'error';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .profile {
    font-family: Arial, sans-serif;
    max-width: 600px;
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
  
  .profile-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .avatar-section {
    margin-right: 20px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .avatar-placeholder {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  
  .info {
    flex: 1;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type='text'],
  input[type='email'],
  input[type='file'] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .save-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .save-button:hover {
    background-color: #218838;
  }
  
  .message {
    margin-top: 20px;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
  }
  
  .message.success {
    background-color: #d4edda;
    color: #155724;
  }
  
  .message.error {
    background-color: #f8d7da;
    color: #721c24;
  }
  </style>
  