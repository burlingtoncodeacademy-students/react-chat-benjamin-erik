import React from "react";

// component for submitting messages / author name
function Form() {
  return (
    <div id="form-container">
      {/* input for username */}
      <form method="post" action="/chat">
        <input
          className="user-input"
          // name property gets used by server to pass message and author to database
          name="author"
          type="text"
          placeholder="Author"
          maxLength="100"
        />
        {/* input for message */}
        <input
          className="user-input"
          name="message"
          type="text"
          placeholder="Message"
          maxLength="500"
        />
        <input className="submit" type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Form;
