import React, { useEffect, useState, prevPosts } from "react";
import Form from "./Form";
import Sidebar from "./Sidebar";

function Display() {
  // poll every 10 seconds for new database updates?
  // setTimeout()

  const [posts, setPosts] = useState([]);

  let counter = 0;

  function count() {
    setTimeout(() => {
      counter++;
    }, 10000);
  }

  useEffect(() => {
    // console.log("one trigger");
    // fire a fetch from a route to the database established in server file
    fetch("/read")
      .then((message) => message.json())
      .then((res) => setPosts(res));
  }, [count]);

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
