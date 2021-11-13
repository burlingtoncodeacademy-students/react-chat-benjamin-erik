import React from "react";

function Sidebar(props) {
  // find a way for one of these buttons to trigger props.updateRoom

  return (
    <>
      <div id="sidebar-container">
        <h2 className="sidebar-title">Available Rooms</h2>
        <form method="post" action="/room">
          <input
            className="room-button"
            type="submit"
            name="room"
            value="dogs"
          />
        </form>
        <form method="post" action="/room">
          <input
            className="room-button"
            type="submit"
            name="room"
            value="main"
          />
        </form>
        <form method="post" action="/room">
          <input
            className="room-button"
            type="submit"
            name="room"
            value="coding"
          />
        </form>
      </div>
    </>
  );
}

export default Sidebar;
