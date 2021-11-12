import React from "react";
import Form from "./Form";
import Sidebar from "./Sidebar";

function Display() {
  // poll every 10 seconds for new database updates?
  // setTimeout()

  // fire a fetch from a route to the database established in server file
  return (
    <div id="display-container">
      <div className="chat-header">
        <h1>Hello, Chat!</h1>
      </div>
      <div id="main-container">
        <Sidebar />
        <div className="chat-container"></div>
      </div>
      <div className="chat-footer">
        <Form />
      </div>
    </div>
  );
}

export default Display;
