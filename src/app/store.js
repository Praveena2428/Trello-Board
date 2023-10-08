import {configureStore} from "@reduxjs/toolkit";
// import todoReducer from "../reducer/todo/todoSlice";
import listReducer from "../reducer/todo/list";

//  Create a function to save state to local storage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state to local storage:", err);
  }
};

// Create a function to load state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined; // If there's no saved state, return undefined to use the initial state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from local storage:", err);
    return undefined;
  }
};
const initialState = loadStateFromLocalStorage(); // Initialize from local storage

const store = configureStore({
    reducer: {
        list: listReducer, // Use "list" as the key to match the reducer to the state
      },
      preloadedState: initialState, 
});
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
