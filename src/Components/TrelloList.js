import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { handleEditCard } from "../reducer/todo/list";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const TrelloList = ({ title, cards, ListId, index }) => {
  const dispatch = useDispatch();

  const handleEditCardRedux = (cardId, editedText) => {
    dispatch(handleEditCard({ cardId, editedText }));
  };

  return (
    <Droppable droppableId={ListId} index={index}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="listWrapper"
        >
          <div className="listHeading">
            <h4>{title}</h4>

            <MoreHorizIcon color="action" />
          </div>

          {cards.map((card, index) => (
            <TrelloCard
              key={card.id}
              text={card.text}
              id={card.id}
              index={index}
              listId={ListId}
              onEditCard={handleEditCardRedux}
            />
          ))}

          <TrelloActionButton isList={false} listId={ListId} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TrelloList;
