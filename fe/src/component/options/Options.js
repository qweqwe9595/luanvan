import React from "react";
import "./option.scss";
import { FaComments } from "react-icons/fa";

function Options() {
  return (
    <div className="options">
      <div className="options-container">
        <div className="tag">
          <FaComments />
          <span>Group Chat</span>
        </div>
        <div className="tag">
          <FaComments />
          <span>Group Chat</span>
          <span>4</span>
        </div>
      </div>
    </div>
  );
}

export default Options;
