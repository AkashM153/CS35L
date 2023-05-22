
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ashish_basetty:gHffcx7KnULdcZOE@bruinconnect.nzayoje.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const User = require('./userSchema');
const Event = require('./eventSchema')

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

async function matchEmailPassword(email, password){
  try {
    const user = await User.findOne({email: email, password: password});
    if (user){
      return user;
    }
  }
  catch {
    console.log("Match failure :(")
  }
  return null;
}

async function addEvent(data){
  if (!data.orgname || !data.title || !data.location){
    return 1; //invalid input (a field is blank)
  }
  const fEvent = await Event.findOne({orgname: data.orgname, title: data.title});
  if (fEvent){
    return 2; //event with same orgname and title already exists
  }
  const nEvent = new Event({
    creator: data.creator,
    orgname: data.orgname,
    title: data.title,
    description: data.description,
    date: data.date,
    location: data.location
  });
  try{
    nEvent.save()
    console.log('Event Upload Successful!')
    return 0;
  }
  catch{
    console.log('Event Upload Failure')
    return 3;
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
  matchEmailPassword,
  addEvent
};

