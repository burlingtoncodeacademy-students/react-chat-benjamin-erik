import { PromiseProvider } from "mongoose";
import React, { useEffect, useState } from "react";
import Form from "./Form";
import Sidebar from "./Sidebar";

function Display(props) {
  // ** the way this is set up, Display basically serves as App.js - remove that redundancy later **

  // this function needs a state called currentRoom
  const [currentRoom, setCurrentRoom] = useState("main");

  // , and a function to update it,
  function updateRoom(newRoom) {
    setCurrentRoom(newRoom);
    console.log("The current room is: " + currentRoom);
  }
  // which should later be passed to Sidebar via a prop. This state needs to be passed into Form, so that new messages get written to that currentRoom as well. from there it will get sent to the server

  const [posts, setPosts] = useState([]);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // useEffect will enable fetching from database on page load, one time
  useEffect(() => {
    console.log("one trigger");
    // fire a fetch from a route to the database established in server file
    const apiCall = () => {
      console.log("tick");

      fetch("/read")
        .then((message) => message.json())
        .then((res) => setPosts(res));

      // call timing function to trigger again in 10 secs
      setTimeout(apiCall, 10000);
    };
    // start timing function to display immediately on page load
    setTimeout(apiCall, 0);
  }, []);

  return (
    <div id="display-container">
      <div className="chat-header">
        <h1>Welcome to the React Chat!</h1>
      </div>
      <div id="main-container">
        <Sidebar updateRoom={updateRoom} />
        <div className="chat-container">
          <ul>
            {posts.map((post) => (
              <li>
                {post.author}
                <br />
                <br /> {post.message}
                <div className="timestamp">
                  <div className="date">{post.date}</div>
                  <div className="time">{post.time}</div>
                  <div className="current-room">
                    {capitalize(post.room)} Chat
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="chat-footer">
        {/* form needs current room to write to the correct place, and will pass it to server */}
        <Form currentRoom={currentRoom} />
      </div>
    </div>
  );
}

export default Display;
