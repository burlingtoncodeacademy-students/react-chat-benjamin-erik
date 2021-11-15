import React from "react";

// component for chatroom menu
function Sidebar() {
  return (
    <>
      <div id="sidebar-container">
        {/* titile */}
        <h2 className="sidebar-title">Available Rooms</h2>
        {/* menu categories set up as forms, so that server can access req.body params */}
        <form method="post" action="/room">
          <input
            className="room-button"
            type="submit"
            name="room"
            // this value gets used by server.js to set current room read and write
            value="Main"
          />
        </form>
        {/* form / button for dogs room */}
        <form method="post" action="/room">
          <input
            className="room-button"
            type="submit"
            name="room"
            value="Dogs"
          />
        </form>
        {/* form / button for coding room */}
        <form method="post" action="/room">
          <input
            className="room-button"
            type="submit"
            name="room"
            value="Coding"
          />
        </form>
      </div>
    </>
  );
}

export default Sidebar;
