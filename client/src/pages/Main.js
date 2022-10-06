import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Main.css";
import Input from "../components/inputs/Input";

const Main = () => {
  const navigate = useNavigate();

  const [chat, setChat] = useState("");
  const [name, setName] = useState("");
  const [openName, setOpenName] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const onSaveName = (e) => {
    e.preventDefault();
    setName(name);
  };

  const onSaveChat = (e) => {
    e.preventDefault();
    setChat(chat);
  };

  const onCreateChat = () => {
    localStorage.setItem(chat, []);
    setRoomList(Object.keys(localStorage));
    setOpenChat(false);
  };

  const onStartChat = (value) => {
    if (name === "") {
      alert("이름을 입력해주세요!");
    } else {
      navigate(`/room/${chat}/${name}`);
    }
  };

  useEffect(() => {
    setRoomList(Object.keys(localStorage));
  }, []);

  return (
    <>
      <h5 className="title">CHAT ROOMS</h5>
      <button className="button1" onClick={() => {setOpenChat(true); setOpenName(false);}}>
        새로운 방 만들기
      </button>
      {roomList &&
        roomList.map((room, index) => (
          <div key={index} style={{ display: "inline-flex" }}>
            <div
              className="room"
              onClick={() => {
                setOpenName(true);
                setOpenChat(false);
              }}
            >
              <h1>{room}</h1>
            </div>
          </div>
        ))}
      {openChat ? (
        <Input
          title="CREATE ROOM"
          button="CREATE"
          onSubmit={onSaveChat}
          setValue={setChat}
          value={chat}
          onCreateChat={onCreateChat}
          setOpen={setOpenChat}
        />
      ) : null}
      {openName ? (
        <Input
          title="USER NAME"
          button="START"
          onSubmit={onSaveName}
          setValue={setName}
          value={name}
          onCreateChat={onStartChat}
          setOpen={setOpenName}
        />
      ) : null}
    </>
  );
};

export default Main;
