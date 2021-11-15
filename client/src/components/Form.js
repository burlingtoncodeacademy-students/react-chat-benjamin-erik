import React from "react";

function Form() {
  return (
    <div id="form-container">
      <form method="post" action="/chat">
        <input
          className="user-input"
          name="author"
          type="text"
          placeholder="Author"
          maxLength="100"
        />
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
