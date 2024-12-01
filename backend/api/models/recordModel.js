// ../api/models/recordModels.js

const mongoose = require('mongoose');

// Define the schema for the Record model
const recordSchema = new mongoose.Schema(
  {
    english: {
      type: String,
      required: "English is required!",
      trim: true, // Removes leading/trailing spaces
    },
    german: {
      type: String,
      required: "German is required!",
      trim: true, // Removes leading/trailing spaces
    },
    french: {
      type: String,
      required: "France is required!",
      trim: true, // Removes leading/trailing spaces
    },
  },{ timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Export the Record model
module.exports = mongoose.model("Record", recordSchema);
