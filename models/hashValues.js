const mongoose = require('mongoose');

const hashSchema = new mongoose.Schema({
    secret_code: {
        type: String,
        required: true
    }
});

const HashModel = mongoose.model('HashModel', hashSchema);

module.exports = HashModel;