const mongoose = require('mongoose');

// Define schema for Events
const eventSchema = new mongoose.Schema({
    // Event creator as their objectID in string form
    creator: {
        type: String,
        required: true
    },
    // Event creator's name
    creatorname: {
        type: String,
    },
    // Event hosted by organization
    orgname: {
        type: String,
        required: true
    },
    // Title of event
    title: {
        type: String,
        required: true
    },
    // Event description
    description: {
        type: String,
        required: true
    },
    // Type of Event
    eventtype: {
        type: String,
        required: false
    },
    // Starting Time and Date
    startDate: {
        type: Date,
        required: true
    },
    // Starting Time and Date
    endDate: {
        type: Date,
        required: true
    },
    // Location coordinates of event
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
    },
    // String location and room combined
    locNameandRoom: {
        type: String
    },
    // Image for event
    image: {
        data: {
          type: Buffer // Store the image data as a Buffer
        },
        contentType: {
          type: String // The MIME type of the image
        }
    },
    // Array of userIDs who liked event
    likes: {
        type: [String],
        default: []
    }

});

// Use the schema to create the Event object
const Event = mongoose.model('Event', eventSchema);

// Create an index for location searching
Event.collection.createIndex({ location: '2dsphere' });


module.exports = Event;
