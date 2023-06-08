const express = require("express");
const cors = require("cors");
const app = express();
const { ObjectId } = require('mongodb');
const { newUser, findUserFromEmail, findUsersFromName, matchEmailPassword, addEvent, getEventOrgTitle, getEvents, addLike, unLike, addRequest, resolveRequest, addFriend, removeFriend, listFriends, listRequests } = require("./mongo");

///////SETUP////////////////////////////////////////////////////////////////////////

/*
  Allow backend server at http://localhost:5000 to 
  communicate with the frontend React app
*/
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

// Setup port for backend process at http://localhost:5000
let port = process.env.PORT;
if(port == null || port == "") {
 port = 5000;
}

// Use express.js to listen for requests coming to the port
app.listen(port, (err) => {
    if (!err){
        console.log("listening");
    }
})

///////RESPONSE HANDLERS////////////////////////////////////////////////////////////

/*
  Use the corsOptions defined previously to allow frontend to 
  access backend resources, and allow for parsing of incoming JSON
*/  
app.use(cors(corsOptions));
app.use(express.json());

// Route for user signup
app.post('/signup', async (req, res) => {
    const userData = req.body // Obtain user data from the request
    console.log('Received data:', userData); // Log our received data for backend monitoring
    const searchUser = await findUserFromEmail(userData.email); // Search for already existing user using mongo function
    
    // If user doesn't already exist
    if (!searchUser){
      // If any of the required fields are empty, send message to frontend and don't create user
      if (userData.firstName == ''|| userData.lastName == ''|| userData.email == ''|| userData.password == ''){
        res.status(202).json({message: "Empty fields, user not created"});
      }
      else {
        const savedUser = await newUser(userData); // Create new user from data

        // Send message to frontend with created user data, and log for backend monitoring
        res.status(201).json({message: "User created", id: savedUser._id, name: savedUser.firstName + " " + savedUser.lastName});
        console.log("User created:", userData);
      }
    }
    else {
      res.status(200).json({message: "User already exists"});
    }
})

// Route for user login
app.post('/login', async (req, res) => {
  const loginData = req.body // Obtain user data from the request
  console.log('Received data:', loginData); // Log our received data for backend monitoring
  
  // Match user to existing user from given email and password
  const searchUser = await matchEmailPassword(loginData.email, loginData.password);

  //If matching user is found
  if (searchUser){
    // Send message to frontend indicating successful login, with important data for user login
    res.status(201).json({message: "Successful login, main page redirect", id: searchUser._id, name: searchUser.firstName + " " + searchUser.lastName})
  }
  else {
    // If user not found, send message to fronted indicating unsuccessful login
    res.status(202).json({message: "Invalid email/password"})
  }
})

// Route for adding new event
app.post('/addevent', async (req, res) => {
  data = req.body; // Obtain event data from the request
  console.log('Received data:', data); // Log our received data for backend monitoring

  // If there is no event organization name or title, send message saying invalid input
  if (!data.orgname || !data.title){
    res.status(201).json({message: "Invalid Input"});
    return;
  }
  else {
    // Try to find an event with the same organization name and title
    const oldEvent = await getEventOrgTitle(data.orgname, data.title);
    // If such an event already exists, send message to frontend saying event already exists
    if (oldEvent){
      res.status(202).json({message: "Event Already Exists"});
      return;
    }
    try{
      // Try uploading the new event using the data
      const ev = await addEvent(req.body);
      // If successful upload or failure, send message saying so
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

// Route for liking an event
app.post('/likeevent', async(req, res) => {
  // Extract the userID and eventID from the request
  const userID = req.body.userID;
  const eventID = req.body.eventID;
  console.log('Received event like: ', userID, eventID) // Log our received data for backend monitoring
  try{
    // Try to like the event using mongo function, send message indicating success or failure
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

// Route for unliking an event
app.post('/unlikeevent', async(req, res) => {
  // Extract the userID and eventID from the request
  const userID = req.body.userID;
  const eventID = req.body.eventID;
  console.log('Received event unlike: ', userID, eventID) // Log our received data for backend monitoring
  try{
    // Try to unlike the event using mongo function, send message indicating success or failure
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

// Route for retrieving events for display
app.post('/getevents', async (req, res) => {
  // Extract search parameters from request
  const data = req.body;
  console.log('Received input: ', data); // Log our received data for backend monitoring
  try{
    // Use mongodb function to obtain list of friends from the user and obtain their IDs
    const friends = await listFriends(data.userID)
    const friendsList = friends.map(user => user._id.toString())
    // Retrieve events using mongodb function, with list of friends as an input
    const eventlist = await getEvents(data, friendsList);
    // If event list is not found, send message saying event retrieval failure
    if (!eventlist){
      res.status(203).json({message: "Failure to retrieve events"})
    }
    // If event list is retrieved, send to frontend as success
    else {
      console.log("Retrieved events: ", eventlist)
      res.status(200).json(eventlist)
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to retrieve events, err: ", err})
  }
})

// Route for searching for friends to add/remove
app.post('/searchforfriends', async (req, res) => {
  // Extract friend data from request
  const userData = req.body;
  console.log('Received input: ', userData); // Log our received data for backend monitoring
  // Attempt to find list of users from name
  try{
    const searchUser = await findUsersFromName(userData.firstName,userData.lastName);
    // Check if list is empty and we cannot find the possible users
    if (searchUser.length === 0){
      res.status(203).json({message: "Could not find user"})
    }
    else {
      // Remove current user from the list, if the list is then empty return message saying you can't add/remove yourself
      const filteredUsers = searchUser.filter(user => user._id.toString() !== userData.userID);
      if (filteredUsers.length === 0) {
        res.status(203).json({ message: "You cannot add yourself as a friend!" });
      } 
      // If there are valid users, return the users to frontend
      else {
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

// Route to add friend
app.post('/addfriend', async(req, res) => {
  // Extract user and new friend's id from the response
  const userID = req.body.userID;
  const friendUserID = req.body.friendUserID;
  console.log('Received user and friend to add: ', userID, friendUserID) // Log our received data for backend monitoring
  try{
    // List the current friends' IDs of the user
    const friends = await listFriends(userID)
    const friendsList = friends.map(user => user._id.toString())
    // Add the new friend using mongodb to the friends array
    const nUser = await addFriend(userID, friendUserID)
    // If the current friendsList already has the user, return that the user is already your friend
    if (friendsList.includes(friendUserID)){
      res.status(203).json({message: "User already your friend"})
    }
    // If the friend has been successfully added, return the current user to frontend
    else if (nUser){
      console.log("Added friend for user", nUser)
      res.status(200).json(nUser)
    }
    // If no user could be found, return that to the frontend
    else {
      res.status(203).json({message: "Couldn't find friend"})
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to add friend, err: ", err})
  }
})

// Route for removing a specific friend
app.post('/removefriend', async(req, res) => {
  // Extract user and friend's ID from request
  const userID = req.body.userID;
  const friendUserID = req.body.friendUserID;
  console.log('Received user and friend to remove: ', userID, friendUserID) // Log our received data for backend monitoring
  try{
    // List the current friends' IDs of the user
    const friends = await listFriends(userID)
    const friendsList = friends.map(user => user._id.toString())
    // Remove the friend from the current user's friends array
    const nUser = await removeFriend(userID, friendUserID)
    // If the friend is not in the current user's friends array, return that the user is not your friend
    if (!friendsList.includes(friendUserID)){
      res.status(203).json({message: "User is not currently your friend"})
    }
    // If the user has been successfully removed, return the current user to the frontend
    else if (nUser){
      console.log("Removed friend for user", nUser)
      res.status(200).json(nUser)
    }
    // If the current user could not be found, return that to the frontend
    else {
      res.status(203).json({message: "Couldn't find friend"})
    }
  }
  catch (err){
    res.status(203).json({message: "Failed to remove friend, err: ", err})
  }
})

// Route to list friends
app.post('/listfriends', async(req, res) => {
  // Extract user ID from the request
  const userID = req.body.userID;
  console.log('Received friends list request') // Log our received data for backend monitoring
  try {
    // Retrieve friends list from backend and send to frontend using mongodb function
    const friends = await listFriends(userID)
    res.status(200).json(friends)
  }
  catch (err){
    res.status(203).json({message: "Failed to retrieve friends, err: ", err})
  }
})

// Route to list friend requests
app.post('/listrequests', async(req, res) => {
  // Extract user ID from the request
  const userID = req.body.userID;
  console.log('Received friend requests list request') // Log our received data for backend monitoring
  try {
    // List user friend requests, and send to frontend
    const requests = await listRequests(userID)
    res.status(200).json(requests)
  }
  catch (err){
    res.status(203).json({message: "Failed to retrieve friend requests, err: ", err})
  }
})