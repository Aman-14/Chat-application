import React from "react";
import { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import "./Send.css";
import messages from "../messages";

function Send({ sendMessage }) {
  const [chatInput, setChatInput] = useState("");

  function handleSubmit() {
    if (!chatInput) return;
    messages.push({
      name: "You",
      content: chatInput,
      position: "right",
    });
    setChatInput("");
    sendMessage(chatInput);
  }

  return (
    <div className="send">
      <div className="send__inputContainer">
        <input
          autoComplete="off"
          value={chatInput}
          name="chatInput"
          placeholder="Type a message"
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && handleSubmit();
          }}
        />
      </div>
      <div>
        <SendIcon className="send__button" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Send;
