const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabSchema = new Schema({
    english: {
        type: String,
        required: 'English word can not be blank'
    },
    german: {
        type: String,
        required: 'German word can not be blank'
    }},
    { collection: 'vocab'}
);

module.exports = mongoose.model('Vocab', VocabSchema);