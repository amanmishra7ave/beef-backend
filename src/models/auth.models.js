const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
}, { timestamps: true });

module.exports = mongoose.model('Auth', authSchema);