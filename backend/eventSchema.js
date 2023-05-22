const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orgname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: [Number],
        index: '2dsphere',
        required: true
    }

});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;