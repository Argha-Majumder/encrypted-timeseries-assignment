const mongoose = require('mongoose');

// Define a schema
const dataSchema = new mongoose.Schema({
    name: String,
    origin: String,
    destination: String,
    secret_key: String,
}, {
    timestamps: true
});

// Create a model from the schema
const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;