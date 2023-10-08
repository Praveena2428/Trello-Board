import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextareaAutosize from "react-textarea-autosize";

const TrelloCard = ({ text, id, index, onEditCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEditCard(id, editedText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedText(text);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className="card">
            {isEditing ? (
              <div className="editInput">
                <Card className="addcard-wraper">
                  <TextareaAutosize
                    className="textArea"
                    type="text"
                    value={editedText}
                    onChange={handleChange}
                  />
                  <div className="button">
                    <Button
                      style={{ backgroundColor: "#5aac44", color: "white" }}
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                    <CloseIcon onClick={handleCancelClick} />
                  </div>
                </Card>
              </div>
            ) : (
              <div className="editIcon">
                <Typography style={{ color: " #172b4d" }}>
                  {editedText}
                </Typography>
                <EditIcon
                  style={{ fontSize: "20px" }}
                  color="disabled"
                  onClick={handleEditClick}
                />
              </div>
            )}
          </Card>
          {provided.placeholder}

        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
