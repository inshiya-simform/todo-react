import { nanoid } from "nanoid";
import type { TodoAction, TodoState } from "../types/types";

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD":
      return {
        todos: [
          ...state.todos,
          {
            id: nanoid(),
            task: action.payload.task,
            createdAt: action.payload.createdAt,
            isDone: action.payload.isDone,
          },
        ],
      };
    case "DELETE":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "MARK_AS_DONE":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.isDone = true;
          }
          return todo;
        }),
      };
    case "EDIT":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.task = action.payload.task;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
}