require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

// ** change this connection to Atlas later **
// connecting to database
mongoose.connect("mongodb://localhost:27017/chat-test");
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

start();

async function start() {
  // set up message schema
  let messageSchema = new mongoose.Schema({
    date: Date,
    message: String,
    author: String,
  });

  // set up message model
  let Message = mongoose.model("Message", messageSchema);

  // set up route for submitting messages
  app.post("/message", async (req, res) => {
    // create new message
    const newMessage = new Message({
      date: Date(),
      // take data from form inputs
      message: req.body.message,
      author: req.body.author,
    });
    // save message in database
    await newMessage.save();
  });
}

// set up route to pull message from database, display on page

app.listen(port, () => {
  console.log("listening on port: " + port);
});
