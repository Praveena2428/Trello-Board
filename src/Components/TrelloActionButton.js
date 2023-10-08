import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, addList } from "../reducer/todo/list";
import AddIcon from "@mui/icons-material/Add";
import TextareaAutosize from "react-textarea-autosize";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddCardIcon from "@mui/icons-material/AddCard";


const TrelloActionButton = ({ isList, listId }) => {
  const [text, setText] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const placeholder = isList
    ? "Enter list title..."
    : "Enter a title for this card...";
  const buttonTitle = isList ? "Add List" : "Add Card";
  const buttonStyle = isList ? "ListBtn" : "AddBtn";

  const dispatch = useDispatch();

  const handleAddItem = (e) => {
    e.preventDefault();
    if (text) {
      if (isList) {
        dispatch(addList(text));
      } else {
        dispatch(addTodo({ listId, text }));
      }
      setText("");
    }
  };
  const handleClick = () => {
    setOpenForm(true);
  };

  return (
    <div>
      {openForm ? (
        <div>
          <Card className="addcard-wraper">
            <TextareaAutosize
              className="textArea"
              placeholder={placeholder}
              onBlur={() => setOpenForm(false)}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Card>
          <div className="button">
            <Button
              onMouseDown={handleAddItem}
              style={{ backgroundColor: "#5aac44", color: "white" }}
            >
              {buttonTitle}
            </Button>
            <CloseIcon className="icons" onClick={() => setOpenForm(false)} />
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "272px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className={buttonStyle} onClick={handleClick}>
            <AddIcon color="action" className="icons" />
            <p
              style={{ color: "rgba(0, 0, 0, 0.54)", fontWeight: 500 }}
            >{`Add ${isList ? "another list" : "a card"}`}</p>
          </div>
          {!isList ? (
            <div>
              <AddCardIcon className="icons" color="disabled" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TrelloActionButton;
