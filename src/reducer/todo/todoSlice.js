import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {id:1,text:"helloworld"},
    {id:2,text:"worldfamous"},
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, actions) => {
      const todo = {
        id: nanoid(),
        text: actions.payload,
      };
      state.todos.push(todo);
    },
  },
});
export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
