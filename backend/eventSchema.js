const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    creatorname: {
        type: String,
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
    eventtype: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }   
    }

});

const Event = mongoose.model('Event', eventSchema);
Event.collection.createIndex({ location: '2dsphere' });


module.exports = Event;
