
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "Insert Mongo Link";
const mongoose = require('mongoose');
const User = require('./userSchema');
const Event = require('./eventSchema');

// Use mongoose to create a connection to MongoDB
try{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to mongoose!");
}
catch{
  console.log("Failed connection");
}

/**
 * Creates a new user from input data
 * @param {Object} data - New user data in JSON format
 * @returns {User|null} - Saved new user if successful, null if not
 */
async function newUser(data){
  const nUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  });
  try{
    savedUser = await nUser.save()
    console.log('User Upload Successful!')
    return savedUser;
  }
  catch{
    console.log('User Upload Failure')
    return null;
  }
}

/**
 * Finds user from a given email
 * @param {string} email - User email to search with
 * @returns {User|null} - Found user if successful, null if user cannot be found
 */
async function findUserFromEmail(email){
  try {
    const user = await User.findOne({email: email});
    if (user){
      return user;
    }
  }
  catch {
    console.log("User search failure :(")
  }
  return null;
}

/**
 * Find user from a given first name and last name
 * @param {string} firstName - User first name to search
 * @param {string} lastName - User last name to search
 * @returns {Array<User>} - Array of users with matching first and last names
 */
async function findUsersFromName(firstName,lastName){
  try {
    console.log(firstName, lastName)
    const Users = await User.find({firstName: firstName, lastName: lastName});
    console.log(Users)
    if (Users.length > 0){
      console.log("found")
      return Users;
    }
  }
  catch {
    console.log("User search failure :(")
  }
  return [];
}

/**
 * Find user with matching email and password
 * @param {string} email - User email to match with
 * @param {string} password - User unhashed password to match with
 * @returns {User|null} - Found user with matching email and password, or null if cannot be found
 */
async function matchEmailPassword(email, password) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Couldn't find user");
      return null;
    } else {
      return new Promise((resolve, reject) => {
        user.comparePassword(password, function (error, isMatch) {
          if (error) {
            console.log("There's an error??");
            reject(error);
          } else if (isMatch) {
            console.log("There's a match");
            resolve(user);
          } else {
            console.log("Match failure :(");
            resolve(null);
          }
        });
      });
    }
  } catch (error) {
    console.log("Match failure :(");
    return null;
  }
}

/**
 * Creates a new event with given input data
 * @param {Object} data - New event data in JSON format
 * @returns {Event|null} - New event if successfully created, null if failure
 */
async function addEvent(data){
  const nEvent = new Event({
    creator: data.creator,
    creatorname: data.creatorname,
    orgname: data.orgname,
    title: data.title,
    description: data.description,
    eventtype: data.eventtype,
    locNameandRoom: data.locNameandRoom,
    startDate: data.startDate,
    endDate: data.endDate,
    location: data.location
  });
  try{                                                      
    const newEvent = await nEvent.save()
    console.log('Event Upload Successful!')
    return newEvent;
  }
  catch (err) {
    console.log('Event Upload Failure: ', err)
    return null;
  }
}

/**
 * Finds event with matching organization name and title
 * @param {string} iorgname - Organization name to match with
 * @param {string} ititle - Title to match with
 * @returns {Event|null} - Matching event, or null if not found
 */
async function getEventOrgTitle(iorgname, ititle){
  const fEvent = await Event.findOne({orgname: iorgname, title: ititle});
  return fEvent;
}

/**
 * Retrieves, augments, and scores events for display given search parameters
 * @param {Ojbect} input - JSON format input with search parameters
 * @param {Array<string>} friendsList - List of current user's friends' ObjectIDs
 * @returns {Array<Event>} - List of events which match search parameters, which are augmented and scored for ranking
 */
async function getEvents(input, friendsList){
  try{
    /*
      If the search eventtype is "All Events", no event type filtering,
      else filter results based on search eventtype
    */
    const matchStage = input.eventtype === "All Events" ? {} :  {
      eventtype: input.eventtype
    };

    //List, augment, and rank events using aggregate pipeline
    const results = await Event.aggregate([
      //Performs geospatial search ranking based on distance from user
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [input.loc.lng, input.loc.lat] 
          },
          distanceField: 'distance',
          spherical: true
        },
      },
      //Count then number of likes for this event
      {
        $addFields: {
          likesCount: {$size: "$likes"}
        }
      },
      //Match event type if necessary
      {
        $match: matchStage
      },
      //Make sure event starts between the search date and time
      {
        $match: {
          startDate: {
            $gte: new Date(input.startdate),
            $lte: new Date(input.enddate)
          }
        }
      },
      //Make a list of the friends who liked the event
      {
        $addFields: {
          friendLikes: { $setIntersection: ["$likes", friendsList]}
        }
      },
      //Count the number of friends who liked the event
      {
        $addFields: {
          friendLikesSize: {$size: "$friendLikes"}
        }
      },
      //Score the events for ranking based on distance, number of likes, and number of friends who liked the event
      {
        $addFields: {
          score: {$subtract: [{$subtract: ["$distance", { $multiply: ["$likesCount", 200] } ]}, { $multiply: ["$friendLikesSize", 500] } ]}
        }
      },
      //Order the events based on the score
      {
        $sort: {
          score: 1
        }
      },
      //Allow only the top n events to be displayed to users
      {
        $limit: input.nEvents
      }
    ]).exec();

    /* 
      Iterate through each event, and turn the list of friends who liked the event
      into a list of names of friends who liked the event, and randomly choose one 
      name to be the first name in the list
    */
    for (const event of results){
      const names = []
      for (const friendID of event.friendLikes){
        const friend = await User.findById(friendID).exec()
        if (friend){
          names.push(friend.firstName + " " + friend.lastName)
        }
      }
      if (names.length > 0){
        const j = Math.floor(Math.random() * names.length)
        const temp = names[j]
        names[j] = names[0]
        names[0] = temp
      }
      event.friendLikesNames = names
    }

    return results;
  }
  catch (err){
    console.log("getEvent error: ", err)
    return null;
  }
}

/**
 * Adds a like from a given user to a given event
 * @param {string} userID - The objectID (in string form) of the user liking the event
 * @param {string} eventID - The eventID (in string form) of the event being liked
 * @returns {Event|null} - The event that has been liked, or null if failure or event not found
 */
async function addLike(userID, eventID){
  try{
    const event = await Event.findById(eventID).exec()
    if (!event.likes.includes(userID)){
      event.likes.push(userID)
      event.save()
    }
    return event
  }
  catch{
    return null
  }
}

/**
 * Removes a like from a given user to a given event
 * @param {string} userID - The objectID (in string form) of the user unliking the event
 * @param {string} eventID - The eventID (in string form) of the event being unliked
 * @returns {Event|null} - The event that has been unliked, or null if failure or event not found
 */
async function unLike(userID, eventID){
  try{
    const result = await Event.findByIdAndUpdate(eventID, { $pull: {likes: userID}}, {new: true})
    return result
  }
  catch{
    return null
  }
}

async function addRequest(userID, friendUserID){
  try {
    const friend = await User.findById(friendUserID).exec()
    if (!friend.requests.includes(userID)){
      friend.requests.push(userID);
      friend.save();
    }
    return friend
  }
  catch {
    return null
  }
}

async function resolveRequest(userID, friendUserID){ //remove both people from each other's friends
  try {
    const user = await User.findByIdAndUpdate(userID, { $pull: {requests: friendUserID}}, {new: true})
    const friend = await User.findByIdAndUpdate(friendUserID, { $pull: {requests: userID}}, {new: true})
    return [user,friend]
  }
  catch {
    return null
  }
}

async function addFriend(userID, friendUserID){
  try {
    const user = await User.findById(userID).exec()
    if (!user.friends.includes(friendUserID)){
      user.friends.push(friendUserID);
      user.save();
    }
    return user
  }
  catch {
    return null
  }
}

/**
 * Removes given friend user as a friend from the current user (only a one-way operation)
 * @param {string} userID - The objectID (in string form) of the current user removing a friend
 * @param {string} friendUserID - The objectID (in string form) of the other user being removed as a friend
 * @returns {User|null} - The current user removing the friend, or null if failure or user not found
 */
async function removeFriend(userID, friendUserID){
  try {
    const result = await User.findByIdAndUpdate(userID, { $pull: {friends: friendUserID}}, {new: true})
    return result
  }
  catch {
    return null
  }
}

/**
 * Retrieves a list of a user's current friends
 * @param {string} userID - The objectID (in string form) of the user whose friends we are finding
 * @returns {Array<User>} - A list of users who are our current user's friends
 */
async function listFriends(userID){
  try{
    const user = await User.findById(userID).exec()
    const friendslist = user.friends
    const listFriends = await User.find({_id: { $in: friendslist}})
    console.log(listFriends)
    return listFriends
  }
  catch (err) {
    console.log("listFriends error: ", err)
    return null;
  }
}

async function listRequests(userID){ //incoming
  try{
    console.log("look at me")
    const user = await User.findById(userID).exec()
    const reqsList = user.requests
    const listReqs = await User.find({_id: { $in: reqsList}})
    console.log(listReqs)
    return listReqs
  }
  catch (err) {
    console.log("listreqs error: ", err)
    return null;
  }
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

/**
 * Closes mongoose connection and exits process on 'interrupt' or 'terminate' signals
 */
function gracefulExit(){
  try{
    mongoose.connection.close();
    console.log('Closed mongoose connection');
    process.exit(0);
  }
  catch{
    console.log('Mongoose connection close failed');
  }
}

// Exports functions for use in the backend
module.exports = {
  newUser,
  findUserFromEmail,
  findUsersFromName,
  matchEmailPassword,
  addEvent,
  getEventOrgTitle,
  getEvents,
  addLike,
  unLike,
  addRequest,
  resolveRequest,
  addFriend,
  removeFriend,
  listFriends,
  listRequests
};

