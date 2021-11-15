import "./App.css";
import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Sidebar from "./components/Sidebar";

function App() {
  // create state to hold all posts
  const [posts, setPosts] = useState([]);

  // function to capitalize words
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // useEffect will enable fetching from database on page load, one time
  useEffect(() => {
    // fire a fetch from a route to the database established in server file
    const apiCall = () => {
      // fetch from /read route on server, reset 'posts' state
      fetch("/read")
        .then((message) => message.json())
        .then((res) => setPosts(res));

      // timing function that retriggers apiCall again in 10 secs - updates chatroom with any new messages
      setTimeout(apiCall, 10000);
    };
    // start timing function to display immediately on page load
    setTimeout(apiCall, 0);
  }, []);

  return (
    // div's for styling
    // main body of app
    <div className="App">
      {/* internal display */}
      <div id="display-container">
        {/* header */}
        <div className="chat-header">
          <h1>Welcome to the React Chat!</h1>
        </div>
        <div id="main-container">
          {/* Sidebar component holds a menu to select chatroom */}
          <Sidebar />
          {/* container for message display */}
          <div className="chat-container">
            <ul>
              {/* mapping over posts state to display all messages in chat-container div */}
              {posts.map((post) => (
                // formatting posts in list elements, grabbing relevant data
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
        {/* footer contains form / inputs */}
        <div className="chat-footer">
          {/* component for message entry / send */}
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
