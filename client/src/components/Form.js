import React from "react";

function Form() {
  return (
      <form method="post" action="/message">
        <input name="author" type="text" placeholder="Author" />
        <input name="message" type="text" placeholder="Message" />
        <input type="submit" value="Send"/>
      </form>
  );
}

export default Form;
