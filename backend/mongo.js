
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ashish_basetty:gHffcx7KnULdcZOE@bruinconnect.nzayoje.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const User = require('./userSchema');

try{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to mongoose!");
}
catch{
  console.log("Failed connection");
}

async function newUser(data){
  if (data.firstName == ''|| data.lastName == ''|| data.email == ''|| data.password == ''){
    return 1;
  }
  const nUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  });
  try{
    nUser.save()
    console.log('User Upload Successful!')
    return 0;
  }
  catch{
    console.log('User Upload Failure')
    return 2;
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
    console.log("User search failure :(")
  }
  return null;
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
  matchEmailPassword
};

