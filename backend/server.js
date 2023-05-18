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

app.use(cors(corsOptions))
app.get("/", (req, res) => {
    res.send("awoooga");
}) 

let port = process.env.PORT;
if(port == null || port == "") {
 port = 5000;
}

app.listen(port, (err) => {
    if (!err){
        console.log("listening");
    }
})