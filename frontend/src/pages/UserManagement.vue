<template>
    <div class="user-management">
      <h1>User Management</h1>
  
      <!-- Search Bar -->
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search users by ID, name or email..." 
          @input="filterUsers" 
        />
      </div>
  
      <!-- Table displaying user details -->
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user._id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <select v-model="user.role" @change="updateUserRole(user)" :disabled="isAdminUser(user)">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <button @click="deleteUser(user._id)" 
                      class="delete-button" 
                      :disabled="isAdminUser(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Loading State -->
      <div v-if="loading">Loading...</div>
  
      <!-- Success/Error Message -->
      <div v-if="message" :class="messageType">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserManagement',
    data() {
      return {
        users: [],
        filteredUsers: [],
        loading: false,
        message: '',
        messageType: '', // success or error
        currentUserId: '', // To store the current logged-in user's ID
        searchQuery: '', // Store the search query
      };
    },
    mounted() {
      this.fetchUsers();
      this.currentUserId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
    },
    methods: {
      // Fetch all users from the API
      async fetchUsers() {
        this.loading = true;
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            this.$router.push('/login');
            return;
          }
  
          const response = await axios.get('http://localhost:5000/users/manage_user', {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          this.users = response.data;
          this.filteredUsers = this.users; // Initially, show all users
          this.loading = false;
        } catch (error) {
          console.error('Error fetching users:', error);
          this.loading = false;
          this.message = 'Error fetching users.';
          this.messageType = 'error';
        }
      },
  
      // Filter users based on the search query
      filterUsers() {
        const query = this.searchQuery.toLowerCase();
        this.filteredUsers = this.users.filter(user => {
          return (
            user._id.toLowerCase().includes(query) || // Search by ID
            user.name.toLowerCase().includes(query) || // Search by name
            user.email.toLowerCase().includes(query)    // Search by email
          );
        });
      },
  
      // Delete a user
      async deleteUser(userId) {
        if (userId === this.currentUserId) {
          this.message = 'You cannot delete your own account.';
          this.messageType = 'error';
          return;
        }
  
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push('/login');
          return;
        }
  
        try {
          await axios.delete(`http://localhost:5000/users/manage_user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          // Remove the user from the local list
          this.users = this.users.filter(user => user._id !== userId);
          this.filteredUsers = this.filteredUsers.filter(user => user._id !== userId);
  
          this.message = 'User deleted successfully';
          this.messageType = 'success';
        } catch (error) {
          console.error('Error deleting user:', error);
          this.message = 'Error deleting user.';
          this.messageType = 'error';
        }
      },
  
      // Update user role (admin or user)
      async updateUserRole(user) {
        if (user._id === this.currentUserId) {
          this.message = 'You cannot change your own role.';
          this.messageType = 'error';
          return;
        }
  
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push('/login');
          return;
        }
  
        try {
          await axios.put(`http://localhost:5000/users/manage_user/${user._id}`, {
            role: user.role,
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          this.message = 'User role updated successfully';
          this.messageType = 'success';
        } catch (error) {
          console.error('Error updating user role:', error);
          this.message = 'Error updating user role.';
          this.messageType = 'error';
        }
      },
  
      // Check if the current user is the admin trying to delete themselves or change their role
      isAdminUser(user) {
        return user._id === this.currentUserId; // If the user ID matches, disable actions
      },
    },
  };
  </script>
  
  <style scoped>
  .user-management {
    font-family: Arial, sans-serif;
    max-width: 1000px;
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
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-bar input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .user-table th,
  .user-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  .user-table th {
    background-color: #f9f9f9;
    font-weight: bold;
  }
  
  .delete-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  
  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
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
  