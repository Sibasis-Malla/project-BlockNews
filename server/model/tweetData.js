const mongoose = require('mongoose');

const tweetData = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    author_id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    decisionTaken: {
        type: Boolean,
        required: true,
    },
    decision: {
        type: Boolean,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    timer: {
        type: Date,
        required: true,
    }
});


module.exports = mongoose.model('tweetData', tweetData);
