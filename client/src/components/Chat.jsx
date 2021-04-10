import React from "react";
import Header from "./Header";
import "./Chat.css";
import Send from "./Send";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "./Messages";
import messages from "../messages";

let socket;
let name;

function Chat({ location }) {
  const ENDPOINT = "https://radiant-mesa-88250.herokuapp.com";

  React.useEffect(() => {
    name = queryString.parse(location.search).name;

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("recieve", ({ name, content }) => {
      messages.push({
        name,
        content,
        position: "left",
      });
    });
    socket.emit("new-user-joined", { name });

    socket.on("user-left", ({ name }) => {
      alert(`${name} left the chat`);
    });

    socket.on("new-user-joined", ({ name }) => {
      alert(`${name} joined the chat`);
    });

    return () => {
      socket.emit("userDisconnect", { name });
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  function sendMessage(content) {
    socket.emit("send", {
      name: name,
      content,
    });
  }

  return (
    <div className="app-background">
      <div className="chat">
        <Header />
        <Messages />
        <Send sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
