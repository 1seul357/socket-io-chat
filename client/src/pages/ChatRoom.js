import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import "../styles/ChatRoom.css";

const socket = io.connect("http://localhost:3001");

const ChatRoom = () => {
  const params = useParams();
  const [state, setState] = useState({ message: "", name: params.name });

  const [chat, setChat] = useState(
    localStorage.getItem(params.chat)
      ? JSON.parse(localStorage.getItem(params.chat))
      : []
  );

  useEffect(() => {
    socket.on("message", ({ name, message, room }) => {
      if (room === params.chat) {
        setChat([...chat, { name, message }]);
        localStorage.setItem(params.chat, JSON.stringify(chat));
      }
    });
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    const room = params.chat;
    socket.emit("message", { name, message, room });
    setState({ message: "", name });
  };

  return (
    <div className="flex-container">
      <div className="card">
        <div className="render-chat">
          <h1>Chat log</h1>
          {chat &&
            chat.map((chatting, index) => (
              <div
                key={index}
                style={
                  chatting.name === params.name
                    ? { textAlign: "right" }
                    : { textAlign: "left" }
                }
              >
                <h5>{chatting.name}</h5>  
                <span className={chatting.name === params.name ? "meMessage" : "youMessage"}>{chatting.message}</span>
              </div>
            ))}
        </div>
        <div className="flex-container">
          <form className="form1" onSubmit={onMessageSubmit}>
            <TextField
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
              style={{ width: "100%" }}
            />
            <button>💌</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
