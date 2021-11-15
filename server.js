require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// connecting to database
mongoose.connect(process.env.URI);
let connection = mongoose.connection;

// error handling for mongoose
connection.on("error", console.error.bind(console, "connection error. "));

// server setup
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

app.use(express.static(staticDir));
// middleware to allow express to parse json's (makes req.body work)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call main async function
start();

// variable declarations for date/time stamp
let date;
let currentDate;
let currentTime;
let seconds;
let minutes;
let hours;

//function for adding zeros to beginning of seconds and minutes if < 10,
// converting hours to 12hr from 24hr, and adding AM/PM accordingly
function timeSanitizer() {
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours > 12) {
    hours = hours - 12;
    seconds = seconds + " PM";
  } else {
    seconds = seconds + " AM";
  }
}

// main function
async function start() {
  // set up message schema
  let messageSchema = new mongoose.Schema({
    date: String,
    time: String,
    message: String,
    author: String,
    room: String,
  });

  // create variable for current room id, initialize to main room
  let currentRoom = "Main";

  // set up message model
  let Message = mongoose.model("Message", messageSchema);

  // set up route for submitting messages
  app.post("/chat", async (req, res) => {
    //updates date and time for new post. adds zeros if necessary
    date = new Date();
    seconds = date.getSeconds();
    minutes = date.getMinutes();
    hours = date.getHours();
    //function for adding zeros to beginning of seconds and minutes (see above)
    timeSanitizer();
    currentTime = `${hours}:${minutes}:${seconds}`;
    currentDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    // create new message
    const newMessage = new Message({
      date: currentDate,
      time: currentTime,
      // take data from form inputs
      message: req.body.message,
      author: req.body.author,
      // take room from currentRoom variable
      room: currentRoom,
    });
    // save message in database
    await newMessage.save();

    // refresh page to avoid hanging
    res.redirect("/");
  });

  // set up route to pull all messages
  app.get("/read", async (req, res) => {
    // set up array in parent scope to hold message data
    let postArray = [];

    // getting cursor
    let allPosts = await Message.find({ room: currentRoom });

    // converting mongo info to json and pushing to new array
    await allPosts.forEach((post) => {
      postArray.push(post);
    });

    // send json obj of messages
    res.send(postArray);
  });

  // route for changing chatroom (only one route needed for all rooms)
  app.post("/room", async (req, res) => {
    // set currentRoom to value of sidebar element input value
    currentRoom = req.body.room;
    res.redirect("/");
  });
}

app.listen(port, () => {
  console.log("listening on port: " + port);
});
