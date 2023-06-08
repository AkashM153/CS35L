const express = require("express");
const cors = require("cors");
const app = express();
const { ObjectId } = require('mongodb');
const { newUser, findUserFromEmail, findUsersFromName, matchEmailPassword, addEvent, getEventOrgTitle, getEvents, addLike, unLike, addRequest, resolveRequest, addFriend, removeFriend, listFriends, listRequests } = require("./mongo");

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

let port = process.env.PORT;
if(port == null || port == "") {
 port = 5000;
}

app.listen(port, (err) => {
    if (!err){
        console.log("listening");
    }
})

///////RESPONSE HANDLERS///////////////////////////////////////

app.use(cors(corsOptions));

//Signup Page
app.use(express.json());
app.post('/signup', async (req, res) => {
    const userData = req.body
    console.log('Received data:', userData);
    const searchUser = await findUserFromEmail(userData.email);
    if (!searchUser){
      if (userData.firstName == ''|| userData.lastName == ''|| userData.email == ''|| userData.password == ''){
        res.status(202).json({message: "Empty fields, user not created"});
      }
      else {
        const savedUser = await newUser(userData);
        res.status(201).json({message: "User created", id: savedUser._id, name: savedUser.firstName + " " + savedUser.lastName});
        //User Login
        console.log("User created:", userData);
      }
    }
    else {
      res.status(200).json({message: "User already exists"});
    }
})

//Login Page
app.post('/login', async (req, res) => {
  const loginData = req.body
  console.log('Received data:', loginData);
  const searchUser = await matchEmailPassword(loginData.email, loginData.password);
  if (searchUser){
    //User Login
    res.status(201).json({message: "Successful login, main page redirect", id: searchUser._id, name: searchUser.firstName + " " + searchUser.lastName})
  }
  else {
    res.status(202).json({message: "Invalid email/password"})
  }
})

//Event Adding
app.post('/addevent', async (req, res) => {
  data = req.body;
  console.log('Received data:', data);
  if (!data.orgname || !data.title){
    res.status(201).json({message: "Invalid Input"});
    return;
  }
  else {
  const oldEvent = await getEventOrgTitle(data.orgname, data.title);
  if (oldEvent){
    res.status(202).json({message: "Event Already Exists"});
    return;
  }
  try{
    const ev = await addEvent(req.body);
    
    // Convert the image data to a Buffer
    //const imageData = Buffer.from(req.body.image, 'base64');

    if (ev){
      console.log("Successful Upload")
      res.status(200).json({message: "Event Upload Success"});
    }
    else {
      res.status(203).json({message: "Event Upload Failure"});
    }
  }
  catch (err){
    res.status(203).json({message: "Event Upload Failure ", err});
  }
  }
})

app.post('/likeevent', async(req, res) => {
  const userID = req.body.userID;
  const eventID = req.body.eventID;
  console.log('Received event like: ', userID, eventID)
  try{
    const liked = await addLike(userID, eventID)
    if (liked){
      console.log("liked event", liked)
      res.status(200).json(liked)
    }
    else {
      res.status(203).json({message: "Couldn't find event in database"})
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to like event, err: ", err})
  }
})

app.post('/unlikeevent', async(req, res) => {
  const userID = req.body.userID;
  const eventID = req.body.eventID;
  console.log('Received event unlike: ', userID, eventID)
  try{
    const unliked = await unLike(userID, eventID)
    if (unliked){
      console.log("unliked event")
      res.status(200).json(unliked)
    }
    else {
      res.status(203).json({message: "Couldn't find event in database"})
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to unlike event, err: ", err})
  }
})

app.post('/getevents', async (req, res) => {
  const data = req.body;
  console.log('Received input: ', data);
  try{
    const friends = await listFriends(data.userID)
    const friendsList = friends.map(user => user._id.toString())
    const eventlist = await getEvents(data, friendsList);
    if (!eventlist){
      res.status(203).json({message: "Failure to retrieve events"})
    }
    else {
      console.log("Retrieved events: ", eventlist)
      res.status(200).json(eventlist)
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to retrieve events, err: ", err})
  }
})

app.post('/searchforfriends', async (req, res) => {
  const userData = req.body;
  console.log('Received input: ', userData);
  try{
    const searchUser = await findUsersFromName(userData.firstName,userData.lastName);
    //rn the error is that we are getting an empty searchUser
    if (searchUser.length === 0){
      res.status(203).json({message: "Could not find user"})
    }
    else {
      const filteredUsers = searchUser.filter(user => user._id.toString() !== userData.userID);
      if (filteredUsers.length === 0) {
        res.status(203).json({ message: "You cannot add yourself as a friend!" });
      } else {
        console.log("Retrieved users:", filteredUsers);
        res.status(200).json(filteredUsers);
      }
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to retrieve user, err: ", err})
  }
})

app.post('/addrequest', async(req, res) => {
  //add userID to friendUserID's request list
  const userID = req.body.userID;
  const friendUserID = req.body.friendUserID;
  console.log('Received user and friend to request: ', userID, friendUserID)
  try{
    const friends = await listFriends(userID)
    const friendsList = friends.map(user => user._id.toString())
    const requests  = await listRequests(friendUserID)
    const reqList = requests.map(user => user._id.toString())
    const nUser = await addRequest(userID, friendUserID)

    if (friendsList.includes(friendUserID)){
      res.status(203).json({message: "User already your friend"})
    }
    else if (reqList.includes(userID)){
      res.status(203).json({message: "User already requested"})
    }
    else if (nUser){
      console.log("Requested friend", nUser)
      res.status(200).json(nUser)
    }
    else {
      res.status(203).json({message: "Couldn't find friend"})
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to add request, err: ", err})
  }
})

app.post('/addfriend', async(req, res) => {
  const userID = req.body.userID;
  const friendUserID = req.body.friendUserID;
  console.log('Received user and friend to add: ', userID, friendUserID)
  try{
    const friends = await listFriends(userID)
    const friendsList = friends.map(user => user._id.toString())
    const nUser = await addFriend(userID, friendUserID)
    if (friendsList.includes(friendUserID)){
      res.status(203).json({message: "User already your friend"})
    }
    else if (nUser){
      console.log("Added friend for user", nUser)
      res.status(200).json(nUser)
    }
    else {
      res.status(203).json({message: "Couldn't find friend"})
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to add friend, err: ", err})
  }
})

app.post('/removefriend', async(req, res) => {
  const userID = req.body.userID;
  const friendUserID = req.body.friendUserID;
  console.log('Received user and friend to remove: ', userID, friendUserID)
  try{
    const friends = await listFriends(userID)
    const friendsList = friends.map(user => user._id.toString())
    const nUser = await removeFriend(userID, friendUserID)
    if (!friendsList.includes(friendUserID)){
      res.status(203).json({message: "User is not currently your friend"})
    }
    else if (nUser){
      console.log("Removed friend for user", nUser)
      res.status(200).json(nUser)
    }
    else {
      res.status(203).json({message: "Couldn't find friend"})
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to remove friend, err: ", err})
  }
})

app.post('/listfriends', async(req, res) => {
  const userID = req.body.userID;
  console.log('Received friends list request')
  try {
    const friends = await listFriends(userID)
    res.status(200).json(friends)
  }
  catch (err){
    res.status(203).json({message: "Failed to retrieve friends, err: ", err})
  }
})

app.post('/listrequests', async(req, res) => {
  const userID = req.body.userID;
  console.log('Received friend requests list request')
  try {
    const requests = await listRequests(userID)
    res.status(200).json(requests)
  }
  catch (err){
    res.status(203).json({message: "Failed to retrieve friend requests, err: ", err})
  }
})