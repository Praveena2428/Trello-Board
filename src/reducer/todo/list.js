import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    title: "To Do",
    id: "0",
    cards: [
      {
        id: "10",
        text: "Design user interface for user profile",
      },
      {
        id: "11",
        text: "Setup project structure",
      },
    ],
  },
  {
    title: "Doing",
    id: "1",
    cards: [
      {
        id: "12",
        text: "Write documentation for API endpoints",
      },
    ],
  },
  {
    title: "Done",
    id: "2",
    cards: [
      {
        id: "13",
        text: "Deploy to production",
      },
      {
        id: "14",
        text: "Implement login functionality",
      },
    ],
  },
];

export const listSlice = createSlice({
  name: "List",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { text, listId } = action.payload;
      const listIndex = state.findIndex((list) => list.id === listId);

      if (listIndex !== -1) {
        const newCard = {
          id: nanoid().toString(),
          text,
        };

        state[listIndex].cards.push(newCard);
      }
    },

    addList: (state, action) => {
      const newList = {
        title: action.payload,
        id: nanoid().toString(),
        cards: [],
      };
      state.push(newList);
    },

    handleEditCard: (state, action) => {
      const { cardId, editedText } = action.payload;

      for (const list of state) {
        const editedCardIndex = list.cards.findIndex(
          (card) => card.id === cardId
        );

        if (editedCardIndex !== -1) {
          list.cards[editedCardIndex].text = editedText;
          break;
        }
      }
    },

    reorderCards: (state, action) => {
      const { source, destination } = action.payload;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return state;
      }

      const sourceList = state.find((list) => list.id === source.droppableId);
      const destinationList = state.find(
        (list) => list.id === destination.droppableId
      );

      const sourceTaskIds = [...sourceList.cards];
      const destinationTaskIds = [...destinationList.cards];

      // Remove the moved task from the source list if it's within the same list
      if (source.droppableId === destination.droppableId) {
        const [movedTask] = sourceTaskIds.splice(source.index, 1);
        sourceTaskIds.splice(destination.index, 0, movedTask);
      } else {
        const movedTask = sourceTaskIds.splice(source.index, 1)[0];
        destinationTaskIds.splice(destination.index, 0, movedTask);
      }

      const newState = state.map((list) => {
        if (list.id === source.droppableId) {
          return {
            ...list,
            cards: sourceTaskIds,
          };
        }

        if (list.id === destination.droppableId) {
          return {
            ...list,
            cards: destinationTaskIds,
          };
        }

        return list;
      });

      return newState;
    },
  },
});
export const { addTodo, addList, reorderCards, handleEditCard } =
  listSlice.actions;

export default listSlice.reducer;
