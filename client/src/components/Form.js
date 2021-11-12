import React from "react";

function Form(props) {

  // need state to store current room. get this from the nav

  // then send currentRoom state to server via the form

  // need to find a way to send props.room to server

  return (
    <div id="form-container">
      <form method="post" action="/chat">
        <input
          className="user-input"
          name="author"
          type="text"
          placeholder="Author"
        />
        <input
          className="user-input"
          name="message"
          type="text"
          placeholder="Message"
        />
        <input className="submit" type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Form;
