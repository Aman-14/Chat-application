import React from "react";
import GroupIcon from "@material-ui/icons/Group";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div>
        <GroupIcon className="header__groupIcon" />
      </div>
      <div>
        <p className="header__title">This is a group</p>
        <p className="header__people">People, people, people</p>
      </div>
    </div>
  );
}

export default Header;
