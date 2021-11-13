require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

// connecting to database
mongoose.connect(process.env.URI);
// mongoose.connect("mongodb+srv://m001-student:m001-mongodb-basics@cluster0.kvif8.mongodb.net/chat?retryWrites=true&w=majority");
let connection = mongoose.connection;

// error handling for mongoose
connection.on("error", console.error.bind(console, "connection error. "));

// server setup
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

app.use(express.static(staticDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function minuteCleanup(minutes) {
  if (minutes < 10) {
    return (minutes = "0" + minutes);
  } else {
    return minutes;
  }
}

start();

//formatting date and setting to variable
let date = new Date();
let currentDate = `
${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
`;
let currentTime = `${date.getHours()}:${minuteCleanup(
  date.getMinutes()
)}:${date.getSeconds()}`;

async function start() {
  // set up message schema
  let messageSchema = new mongoose.Schema({
    date: String,
    time: String,
    message: String,
    author: String,
    room: String,
  });

  // create variable for current room id
  let currentRoom = "main";

  // set up message model
  let Message = mongoose.model("Message", messageSchema);

  // set up route for submitting messages
  app.post("/chat", async (req, res) => {
    // create new message
    const newMessage = new Message({
      date: currentDate,
      time: currentTime,
      // take data from form inputs
      message: req.body.message,
      author: req.body.author,
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

  app.post("/room", async (req, res) => {
    // currentRoom variable = roomName
    currentRoom = req.body.room;
    res.redirect("/");
  });
}

app.listen(port, () => {
  console.log("listening on port: " + port);
});
