const Record = require('../models/recordModel');

exports.createRecord = async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    console.log("Adding new word: " + newRecord);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRecord = async (req, res) => {
  try {
    const records = await Record.find();
    console.log("Get all records")
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    console.log("Get word (id): " + record);
    if (!record) return res.status(404).json({ message: "Record not found!" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecordById = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log("Update record to: " + updatedRecord);
    if (!updatedRecord) return res.status(404).json({ message: "Record not found!" });
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRecordById = async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    console.log("Delete record: " + deletedRecord);
    if (!deletedRecord) return res.status(404).json({ message: "Record not found!" });
    res.json({ message: "Record deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchRecords = async (req, res) => {
  const { query } = req.query; // Get search term
  console.log("Searching record: " + query);
  try {
    const records = await Record.find({
      $or: [
        { english: { $regex: query, $options: 'i' } },
        { german: { $regex: query, $options: 'i' } },
        { france: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
