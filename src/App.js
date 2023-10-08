import "./App.css";
import TrelloList from "./Components/TrelloList";
import { useSelector, useDispatch } from "react-redux";
import TrelloActionButton from "./Components/TrelloActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderCards } from "./reducer/todo/list";

function App() {
  const todos = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const handleDragEnd = (results) => {
    const { destination, source, draggableId } = results;
    if (!destination) {
      return;
    }
    dispatch(
      reorderCards({
        source,
        destination,
        draggableId,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        <h1 style={{ color: "white" }}>Trello Board</h1>
        <div className="listContainer">
          {todos.map((item, index) => (
            <TrelloList
              key={item.id}
              title={item.title}
              cards={item.cards}
              ListId={item.id}
              index={index}
            />
          ))}

          <TrelloActionButton isList={true} />
          
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
