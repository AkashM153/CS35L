
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ashish_basetty:gHffcx7KnULdcZOE@bruinconnect.nzayoje.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const User = require('./userSchema');
const Event = require('./eventSchema');

try{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to mongoose!");
}
catch{
  console.log("Failed connection");
}

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
    location: data.location,/*
    image: {
      data: Buffer.from(data.image, 'base64'),
      contentType: 'image/jpeg' // Adjust the content type based on your image format
    }*/
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

async function getEventOrgTitle(iorgname, ititle){
  const fEvent = await Event.findOne({orgname: iorgname, title: ititle});
  return fEvent;
}

async function getEvents(input, friendsList){
  try{
    const matchStage = input.eventtype === "All Events" ? {} :  {
      eventtype: input.eventtype
    };
    const results = await Event.aggregate([
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
      {
        $addFields: {
          likesCount: {$size: "$likes"}
        }
      },
      {
        $match: matchStage
      },
      {
        $match: {
          startDate: {
            $gte: new Date(input.startdate),
            $lte: new Date(input.enddate)
          }
        }
      },
      {
        $addFields: {
          friendLikes: { $setIntersection: ["$likes", friendsList]}
        }
      },
      {
        $addFields: {
          friendLikesSize: {$size: "$friendLikes"}
        }
      },
      {
        $addFields: {
          score: {$subtract: [{$subtract: ["$distance", { $multiply: ["$likesCount", 200] } ]}, { $multiply: ["$friendLikesSize", 500] } ]}
        }
      },
      {
        $sort: {
          score: 1
        }
      },
      {
        $limit: input.nEvents
      }
    ]).exec();

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

async function unLike(userID, eventID){
  try{
    const result = await Event.findByIdAndUpdate(eventID, { $pull: {likes: userID}}, {new: true})
    return result
  }
  catch{
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

async function removeFriend(userID, friendUserID){
  try {
    const result = await User.findByIdAndUpdate(userID, { $pull: {friends: friendUserID}}, {new: true})
    return result
  }
  catch {
    return null
  }
}

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


process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

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
  addFriend,
  removeFriend,
  listFriends
};

