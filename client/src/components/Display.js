import React, { useEffect, useState, prevPosts } from "react";
import Form from "./Form";
import Sidebar from "./Sidebar";

function Display() {
  // poll every 10 seconds for new database updates?
  // setTimeout()

  const [posts, setPosts] = useState([]);


  // useEffect will enable fetching from database on page load, one time
  useEffect(() => {
    console.log("one trigger");
    // fire a fetch from a route to the database established in server file
    const apiCall = () => {
      console.log("tick")

      fetch("/read")
      .then((message) => message.json())
      .then((res) => setPosts(res));

      // call timing function to trigger again in 10 secs
      setTimeout(apiCall, 10000)

    }
    // start timing function to display immediately on page load
    setTimeout(apiCall, 0)
    
  }, []);

  // also need to convert posts into format readable by react (currently an array of objects)

  return (
    <div id="display-container">
      <div className="chat-header">
        <h1>Hello, Chat!</h1>
      </div>
      <div id="main-container">
        <Sidebar />
        <div className="chat-container">
          <ul>
            {posts.map((post) => (
              <li>
                Author: {post.author} Message: {post.message} Time: {post.date}
              </li>
              // console.log(post.message)
            ))}
          </ul>
        </div>
      </div>
      <div className="chat-footer">
        <Form />
      </div>
    </div>
  );
}

export default Display;
