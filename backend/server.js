const express = require("express");
const cors = require("cors");
const app = express();
const { newUser, findUserFromEmail, matchEmailPassword } = require("./mongo")

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
      const empty = await newUser(userData);
      if (empty == 1){
        res.status(202).json({message: "Empty fields, user not created"});
      }
      else {
        res.status(201).json({message: "User created:", userData});
        //User Login
        console.log("User created:", userData);
      }
    }
    else {
      res.status(200).json({message: "User already exists:", userData});
    }
})

//Login Page
app.post('/login', async (req, res) => {
  const loginData = req.body
  console.log('Received data:', loginData);
  const searchUser = await matchEmailPassword(loginData.email, loginData.password);
  if (searchUser){
    //User Login
    res.status(201).json({message: "Successful login, main page redirect"})
  }
  else {
    res.status(202).json({message: "Invalid email/password"})
  }
})