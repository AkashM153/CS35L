const express = require("express");
const cors = require("cors");
const app = express();
const { newUser, findUserFromEmail, matchEmailPassword, addEvent } = require("./mongo")

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
//Test Page
app.use(cors(corsOptions));
app.get("/test", (req, res) => {
    res.send("Something wooo");
}) 

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
  const ev = await addEvent(req.body);
  switch (ev){
    case (0):{
      res.status(200).json({message: "Event Upload Success"});
      break;
    }
    case (1):{
      res.status(201).json({message: "Invalid Input"});
      break;
    }
    case (2):{
      res.status(202).json({message: "Event Already Exists"});
      break;
    }
    case (3):{
      res.status(203).json({message: "Event Upload Failure"})
      break;
    }
      
  }
  
})