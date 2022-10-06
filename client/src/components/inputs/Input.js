import React from "react";
import { TextField } from "@material-ui/core";
import "../inputs/Input.css"

const Input = ({
  title,
  button,
  onSubmit,
  setValue,
  value,
  onCreateChat,
  setOpen,
}) => {
  return (
    <div className="form-field">
      <form className="form1" onSubmit={onSubmit}>
        <h1>{title}</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            label="Room name"
          />
          <button className="button">SAVE</button>
        </div>
        <div className="bottom-field">
          <button
            className="button"
            style={{ border: "none" }}
            onClick={onCreateChat}
          >
            {button}
          </button>
          <button
            className="button"
            style={{ border: "none" }}
            onClick={() => {setOpen(false);}}
          >
            CLOSE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
