import React from "react";
import { useState } from "react";
import messages from "../messages";
import "./Messages.css";

function Messages() {
  const [mess, setMess] = useState([...messages]);

  setTimeout(() => {
    setMess([...messages]);
    const messageBody = document.querySelector(".message__body");
    if (mess.length !== messages.length && messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight;
    }
  }, 100);

  return (
    <div className="message__body">
      {mess.map(({ name, content, position }) => {
        return (
          <div
            className={
              position === "left"
                ? "message__container message-left"
                : "message__container message-right"
            }
          >
            <p className="message__name">{name}</p>
            <p className="message__content">
              {content}
              <span>
                {new Date().getHours()}:{new Date().getMinutes()}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
