const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filename: { type: String, required: true },
    content: { type: String, required: true } // Base64 string
});

module.exports = mongoose.model('File', fileSchema);
