const express = require("express");
const cors = require("cors");
const app = express();

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
app.post('/signup', (req, res) => {
    const userData = req.body
    console.log('Received data:', userData);
    res.status(200).json({message: "Server received data:", userData});
})