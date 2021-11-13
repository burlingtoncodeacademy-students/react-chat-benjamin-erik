import React from "react";

function Sidebar(props) {

  // find a way for one of these buttons to trigger props.updateRoom


  return (
    <>
      <div id="sidebar-container">
        <form method="post" action="/room">
          <input type="submit" name="room" value="dogs" />
        </form>
        <form method="post" action="/room">
          <input type="submit" name="room" value="main" />
        </form>

        <h2 className="sidebar-title">Available Rooms</h2>
        <h3>Random Chat 1</h3>
        <h3>Random Chat 2</h3>
        <h3>Random Chat 3</h3>
      </div>
    </>
  );
}

export default Sidebar;
