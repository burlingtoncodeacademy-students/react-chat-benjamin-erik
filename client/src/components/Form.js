import React from "react";

function Form() {
  return (
    <div id="form-container">
      <form method="post" action="/message">
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
